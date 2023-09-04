import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { checkUseremailPassword, oAuthToDbUser } from './../../../database/dbUsers';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'correo@google.com' },
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
      },
      async authorize(credentials) {
        // console.log({ credentials });
        //  TODO - validar con base de datos

        return await checkUseremailPassword(credentials!.email, credentials!.password);
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    // STUB ...add more providers here

  ],

  // Callbacks
  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // DEPRECATED
  },

  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            token.user = await oAuthToDbUser(user.email, user.name);
            break;

          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }
  }

};

export default NextAuth(authOptions);