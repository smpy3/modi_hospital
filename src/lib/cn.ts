/** cn(): tiny helper to merge Tailwind class strings safely. */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  // Why: avoids Tailwind class conflicts when we compose animated components.
  return twMerge(clsx(inputs));
}

