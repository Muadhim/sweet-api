export default function getCookieClient(name: string): string | null {
  // Check if the code is running in a browser environment
  if (typeof document === "undefined") {
    return null;
  }

  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");

    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
}
