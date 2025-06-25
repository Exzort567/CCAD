import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          const client = await clientPromise;
          const db = client.db('ccad');
          const user = await db.collection('users').findOne({ username: credentials.username });

          if (user && user.password === credentials.password) {
            // IMPORTANT: Plain text password comparison is not secure!
            // We will fix this in the next step.
            return { id: user._id.toString(), name: user.username, email: '' };
          }
        } catch (e) {
            console.error("Database error during authorization: ", e);
            return null;
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }; 