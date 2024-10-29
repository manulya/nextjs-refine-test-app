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
import dataProviderClient from "@providers/dataProvider";
import { ConstantsProvider } from "@contexts/select-items";
import Head from "next/head";
import { authProvider } from "@providers/auth-provider";
import Footer from "@components/footer";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Nunito:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Suspense>
          <RefineKbarProvider>
            <ColorModeContextProvider defaultMode={defaultMode}>
              <RefineSnackbarProvider>
                <Refine
                  dataProvider={dataProviderClient}
                  routerProvider={routerProvider}
                  notificationProvider={useNotificationProvider}
                  options={refineOptions}
                  authProvider={authProvider}
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
                  <ConstantsProvider>
                    {children}
                    <Footer />
                  </ConstantsProvider>
                  <RefineKbar />
                </Refine>
              </RefineSnackbarProvider>
            </ColorModeContextProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
