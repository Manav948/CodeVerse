try {
  require("dotenv/config");
} catch (e) {
  // Ignored in environments where environment variables are pre-loaded
}

module.exports = {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use DIRECT_URL for migrations, falling back to DATABASE_URL if not set
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
};
