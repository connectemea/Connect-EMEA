import React from "react";
import { MacbookScroll } from "../../../components/ui/macbook-scroll";
import Link from "next/link";

export function MacbookScrollDemo() {
  return (
    <div className="p-10 py-0 dark:bg-[#0B0B0F] bg-custom-bg	 w-full flex justify-center items-center">
    <MacbookScroll
        title={
          <span>
            {/* This Macbook is a ...<br /> No kidding. */}
          </span>
        }
        
        src={`/Images/groupImage.png`}
        showGradient={false}
      />
    </div>
  );
}

