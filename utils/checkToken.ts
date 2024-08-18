import { jwtDecode } from "jwt-decode";

interface JwtToken {
  authorized: boolean;
  exp: number;
  user_id: number;
}

const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtToken>(token);
  const now = Date.now() / 1000;
  return decoded.exp < now;
};

export { isTokenExpired };
