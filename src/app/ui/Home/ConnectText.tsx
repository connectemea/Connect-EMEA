"use client";
import { TextGenerateEffect } from "../../../components/ui/text-generate-effect";

const words = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
