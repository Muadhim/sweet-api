import { getCookie } from "cookies-next";
import { IAuth } from "@/interfaces/Auth";

/**
 * Retrieves and parses the user cookie.
 * @returns {IAuth | null} The parsed user object or null if the cookie is not found or parsing fails.
 */
export const getUserCookie = (): IAuth | null => {
  const userCookie = getCookie("user");

  if (userCookie) {
    try {
      return JSON.parse(userCookie as string) as IAuth;
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
      return null;
    }
  }

  return null;
};
