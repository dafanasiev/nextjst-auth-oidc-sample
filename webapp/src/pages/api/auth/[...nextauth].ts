import isDocker from 'is-docker';
import NextAuth, { NextAuthOptions } from "next-auth";

// see also: https://next-auth.js.org/faq#databases

export const authOptions: NextAuthOptions = {
    secret: "012345678901234567890123456789xx",
    debug: true,

    providers: [{
        id: "idp",
        name: "idp",
        type: "oauth",


        // wellKnown: "http://localhost:21556/idp/.well-known/openid-configuration",

        issuer: "http://idp:21556/idp",
        jwks_endpoint: `http://${isDocker() ? 'idp': 'localhost'}:21556/idp/keys`,
        token: `http://${isDocker() ? 'idp': 'localhost'}:21556/idp/token`,
        authorization: { 
          url: "http://localhost:21556/idp/auth",
          params: { scope: "openid email profile groups offline_access" }
        },

        clientId: "webapp",
        clientSecret: "ZXhhbXBsZS1hcHAtc2VjcmV0",
        idToken: true,
        checks: ["pkce", "state", "nonce"],

        profile(profile) {
            return {
              id: profile.sub,
              name: profile.name ?? profile.preferred_username,
              email: profile.email,
              image: profile.picture ?? null,
              groups: profile.groups,
            }
          },

    }],

  callbacks:{
    jwt({ token, account, profile }) {
      if (account) {
          // modify token
          token.groups = (<any>profile)?.groups;
      }

      return token;
    },

    session({ session, token }) {
      // Send properties to the client

      if (session.user) {
        // modify session
        (<any>session.user).groups = token.groups;
      }

      return session;
    },

    signIn({profile}) {
      if((<any>profile)?.groups.includes('admins') || (<any>profile)?.groups.includes('users')) {
        return true;
      }

      throw new Error(`user not allowed to signin: groups not contains users or admins`);
    }
  },
  events:{
    // NOTE: use events to store user to db if need ....
    //
    //createUser
    //updateUser
  }
};

export default NextAuth(authOptions)
