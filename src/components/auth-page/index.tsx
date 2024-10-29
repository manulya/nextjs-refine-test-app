"use client";

import { type AuthPageProps } from "@refinedev/core";
import { AuthPage as AuthPageBase } from "@refinedev/mui";

function AuthPage(props: AuthPageProps) {
  return (
    <AuthPageBase
      {...props}
      formProps={{
        defaultValues: {
          email: "demo@refine.dev",
          password: "demodemo",
        },
      }}
    />
  );
}

export default AuthPage;
