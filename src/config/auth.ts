import { AuthOptions, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'


export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        Credentials({
            credentials: {
                id: { label: 'id', type: 'id', required: true },
                name: { label: 'name', type: 'name', required: true },
                email: { label: 'email', type: 'email', required: true },
            },
            async authorize(credentials) {
                if (!credentials?.name || !credentials.email) {
                    return null;
                }

                return {
                    id: credentials.id.toString(),
                    name: credentials.name,
                    email: credentials.email
                }
            },
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                console.log("JWT callback - User ID added:", user.id); // Логирование ID пользователя
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            console.log("Session callback - Session ID:", session.user.id); // Логирование ID в сессии
            return session
        }
    }
}