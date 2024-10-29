import { Refine, type IRefineOptions } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

import { ColorModeContextProvider } from "@contexts/color-mode";
import DevtoolsProvider from "@providers/devtools";
import dataProviderClient from "@providers/dataProvider";

export const metadata: Metadata = {
  title: "Memposit NextJS + Refine Test",
};

const refineOptions: IRefineOptions = {
  syncWithLocation: true,
  warnWhenUnsavedChanges: true,
  useNewQueryKeys: true,
  title: {
    text: "Memposit NextJS + Refine Test",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <DevtoolsProvider>
              <ColorModeContextProvider defaultMode={defaultMode}>
                <RefineSnackbarProvider>
                  <Refine
                    dataProvider={dataProviderClient}
                    routerProvider={routerProvider}
                    notificationProvider={useNotificationProvider}
                    options={refineOptions}
                    resources={[
                      {
                        name: "users",
                        list: "/users",
                        create: "/users/create",
                        edit: "/users/edit/:id",
                        show: "/users/show/:id",
                        meta: {
                          canDelete: true,
                        },
                      },
                    ]}
                  >
                    {children}
                    <RefineKbar />
                  </Refine>
                </RefineSnackbarProvider>
              </ColorModeContextProvider>
            </DevtoolsProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
