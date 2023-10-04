"use client";

import * as React from "react";
import { ThemeWrapper } from "@/components/ui/theme-wrapper";
import CardsNewYork from "@/registry/new-york/example/cards/index";

export function ThemesTabs() {
  return (
    <div className="space-y-8">
      <ThemeWrapper>
        <CardsNewYork />
      </ThemeWrapper>
    </div>
  );
}
