import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromDbUnitToDisplayUnit(
  dbValue: string,
): "gram" | "milliliter" | "unit" {
  if (dbValue === "g") {
    return "gram";
  } else if (dbValue === "ml") {
    return "milliliter";
  } else {
    return "unit";
  }
}

export function getInitials(name: string) {
  const words = name.trim().split(" ");

  if (words.length == 0) return "";

  const initials = words.map((word) => word[0]).join("");

  return initials.slice(0, 2);
}

export function calculateCalories(
  protein: number,
  fat: number,
  carbs: number,
): number {
  return protein * 4 + fat * 9 + carbs * 4;
}

export function hyphenEmptyString(value: string) {
  return value === "" ? "-" : value;
}
export function showDecimalIfNotZero(value: number, decimals = 1) {
  return Number(value.toFixed(decimals));
}
