import { type AuthBindings } from "@refinedev/core";
import { cookies } from "next/headers";

const authProviderServer: Pick<AuthBindings, "check"> = {
  check: async () => {
    await Promise.resolve();

    const cookieStore = cookies();
    const auth = cookieStore.get("auth");

    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
};

export default authProviderServer;
