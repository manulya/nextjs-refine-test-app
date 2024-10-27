"use client";

import {
  DevtoolsPanel,
  DevtoolsProvider as DevtoolsProviderBase,
} from "@refinedev/devtools";
import React from "react";

function DevtoolsProvider({ children }: React.PropsWithChildren) {
  return (
    <DevtoolsProviderBase>
      {children}
      <DevtoolsPanel />
    </DevtoolsProviderBase>
  );
}

export default DevtoolsProvider;
