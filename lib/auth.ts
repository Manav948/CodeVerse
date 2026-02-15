import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/sign-in",
        error: "/sign-in",
    },

    adapter: PrismaAdapter(db) as Adapter,

    session: {
        strategy: "jwt",
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("Invalid email or password");
                }

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isValid) {
                    throw new Error("Invalid email or password");
                }

                return user;
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            if (
                account?.provider === "google" ||
                account?.provider === "github"
            ) {
                const existingUser = await db.user.findUnique({
                    where: { email: user.email! },
                });

                if (existingUser) {
                    return true;
                }
            }
            return true;
        },

        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = (user as any).id;
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;
                token.username = (user as any).username;
            }
            if (trigger === "update" && session) {
                const dbUser = await db.user.findUnique({
                    where: {
                        id: token.id as string
                    },
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true,
                        email: true
                    }
                })
                if (dbUser) {
                    token.name = session.name ?? dbUser.name,
                    token.picture = session.image ?? dbUser.image,
                    token.username = session.username ?? dbUser.username
                    token.email = session.email ?? dbUser.email
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.username = token.username as string;
                session.user.image = token.picture as string;
            }

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

export const getAuthSession = () => getServerSession(authOptions);
