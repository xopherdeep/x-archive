"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps, toast } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          position: "fixed",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
