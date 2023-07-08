import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import { auth } from '../../../../firebase/admin';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      authorize: async ({ idToken }: any, _req) => {
        if (idToken) {
          try {
            const decoded = await auth.verifyIdToken(idToken);

            return { ...decoded };
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      },
    }),
  ],
  //   以下は、authorizeで返したユーザ情報をSessionに格納するため
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    // sessionにJWTトークンからのユーザ情報を格納
    async session({ session, token }) {
      session.user.emailVerified = token.emailVerified;
      session.user.uid = token.uid;
      return session;
    },
  },
};

export default NextAuth(authOptions);

// 1. authorizeでユーザ認証し、取得したユーザ情報を返す
// 2. callbacksのjwtで、1から返されたユーザ情報を取得し、返す
// 3. callbacksのsessionで、2から返されたユーザ情報を取得し、Sessionに格納する
// 4. アプリケーションコードでuseSession()やgetServerSession()を利用して3から返された情報を取得する
