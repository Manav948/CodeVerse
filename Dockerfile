# Base image with system dependencies needed for Prisma
FROM node:22-slim AS base
RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Stage 1: Install all dependencies (production + development)
FROM base AS deps
WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies using npm ci for a clean, deterministic build
RUN npm ci --ignore-scripts

# Stage 2: Rebuild the source code and generate client engines
FROM base AS builder
WORKDIR /app

# Copy dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application source code
COPY . .

# Generate the Prisma client (uses schema.prisma output directory setting)
RUN npx prisma generate

# Disable Next.js telemetry during build time
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application (generates the .next/standalone folder)
RUN npm run build

# Stage 3: Lightweight production runner stage
FROM base AS runner
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root system user and group for security
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs

# Set up directory for Next.js cache with proper permissions
RUN mkdir .next && chown nextjs:nodejs .next

# Copy public static files
COPY --from=builder /app/public ./public

# Copy the standalone build server files (includes server.js and node_modules subset)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma schema, migrations, and custom generated client files for runtime use
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/lib/generated/prisma ./lib/generated/prisma

# Copy Prisma CLI and engines for running migrations in production
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Copy translation messages for next-intl localizations
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages

# Switch to the non-root user
USER nextjs

# Expose port 3000
EXPOSE 3000

# Health check to monitor container status using lightweight Node.js script
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { if (res.statusCode === 200) process.exit(0); else process.exit(1); }).on('error', () => process.exit(1))"

# Start the application
CMD ["node", "server.js"]
