import { close } from "inspector";
import { clearPreviewData } from "next/dist/server/api-utils";

interface CapitalizeString {
  (str: string): string;
}
export const capitalizeString: CapitalizeString = (str: string) => {
  const firstChar = str[0].toUpperCase();
  const newStr = str.split("");
  newStr[0] = firstChar;
  return newStr.join("");
};
