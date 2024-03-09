"use client";
import React from "react";
import { BackgroundGradient } from "../../../components/ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

export function BackgroundGradientDemo() {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-xl   bg-white dark:bg-zinc-900">
        <Image
          src={`/Images/groupImage.png`}
          alt="jordans"
          height="600"
          width="400"
          className="object-contain w-full h-full rounded-[22px]"
        />
      </BackgroundGradient>
    </div>
  );
}
