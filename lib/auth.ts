import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { generateFromEmail } from "unique-username-generator";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
    pages: {
        error: "sign-in",
        signIn: "sign-in"
    },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            async profile(profile) {
                const username = generateFromEmail(profile.email, 5)
                return {
                    id: profile.sub,
                    username,
                    email: profile.email,
                    image: profile.image,
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            async profile(profile) {
                const username = generateFromEmail(profile.email, 5)
                return {
                    id: profile.id,
                    username: profile.login ? profile.login : username,
                    email: profile.email,
                    image: profile.avatar_url
                }
            }
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "text", placeholder: "Password" }
            },
            async authorize(credenials) {
                if (!credenials?.email || !credenials.password) {
                    throw new Error("please enter valid email and passoword")
                }
                const user = await db.user.findUnique({
                    where: {
                        email: credenials.email
                    }
                })
                if (!user || !user?.hashedPassword) {
                    throw new Error("User was not found, Please enter Valid email")
                }
                const passwordMatch = await bcrypt.compare(credenials.password, user.hashedPassword)
                if (!passwordMatch) {
                    throw new Error("Entered password is incorrect, please enter correct one")
                }
                return user
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                session.user.name = token.name
                session.user.email = token.email
                session.user.username = token.username
            }
            const user = await db.user.findUnique({
                where: {
                    id: token.id as string
                }
            })
            if (user) {
                session.user.image = user.image ?? session.user.image
                session.user.username = user.username
            }
            return session
        },
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where :{
                    email : token.email as string
                }
            })
            if(!dbUser){
                token.id = user!.id
                return token
            }
            return {
                id : dbUser.id,
                username : dbUser.username,
                email : dbUser.email,
                picture : dbUser.image
            }
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)