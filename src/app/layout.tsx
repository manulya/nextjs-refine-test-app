import { Refine, type IRefineOptions } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { Montserrat, Nunito } from "next/font/google";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

import Footer from "@components/footer";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { ConstantsProvider } from "@contexts/select-items";
import authProvider from "@providers/auth-provider/auth-provider";
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

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800", "1000"],
  variable: "--nunito",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
  variable: "--montserrat",
});

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
      <body className={`${nunito.variable} ${montserrat.variable}`}>
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
