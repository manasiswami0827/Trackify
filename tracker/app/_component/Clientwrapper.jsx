"use client";

import React from "react";
import { Toaster } from "sonner";

export default function ClientWrapper({ children }) {
  return (
    <>
      <Toaster richColors position="top-right" />
      {children}
    </>
  );
}
