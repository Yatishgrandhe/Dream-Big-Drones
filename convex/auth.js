import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { Scrypt } from "lucia";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile: (params) => {
        const email = String(params.email ?? "").trim().toLowerCase();
        if (!process.env.ADMIN_EMAIL || email !== process.env.ADMIN_EMAIL.trim().toLowerCase()) {
          throw new Error("Invalid administrator credentials.");
        }
        return { email };
      },
      crypto: {
        async hashSecret(password) {
          return await new Scrypt().hash(password);
        },
        async verifySecret(password) {
          const configuredHash = process.env.ADMIN_PASSWORD_HASH;
          if (!configuredHash) throw new Error("Administrator password is not configured.");
          return await new Scrypt().verify(configuredHash, password);
        },
      },
    }),
  ],
});
