"use client";

import { ErrorComponent } from "@refinedev/mui";
import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense>
      <ErrorComponent />
    </Suspense>
  );
}
