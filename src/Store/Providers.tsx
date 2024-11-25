"use client";
// import { Toaster } from "@/components/ui/toaster";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./Configstore";

interface ProviderProps {
  children: ReactNode;
}

export const ProviderWrapper: React.FC<ProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      {/* <Toaster /> */}
    </Provider>
  );
};
