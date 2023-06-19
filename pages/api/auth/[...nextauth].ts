import NextAuth, { AuthOptions } from "next-auth";

// adapter
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// providers
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

// decrypt and encrypt utils
import bcrypt from 'bcrypt';

// prisma client
import prisma from '../../../app/libs/prismadb';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: {
                    label: 'password',
                    type: 'password',
                },
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) throw new Error('Invalid credentials');

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                });

                // if there isn't an user or in db there isn't a hashed password
                if (!user || !user?.hashedPassword) throw new Error('Invalid credentials');

                // check the hashedpassword
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword,
                );

                if (!isCorrectPassword) throw new Error('Invalid credentials');

                return user;
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SEECRET,
}

export default NextAuth(authOptions);