import { ThemedLayoutV2 } from "@refinedev/mui";
import { redirect } from "next/navigation";
import React from "react";

import authProviderServer from "@providers/auth-provider/auth-provider.server";

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
  };
}
export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.authenticated) {
    return redirect(data?.redirectTo || "/login");
  }

  return <ThemedLayoutV2>{children}</ThemedLayoutV2>;
}
