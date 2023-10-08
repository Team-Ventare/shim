"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
