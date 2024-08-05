import { baseUrl } from "@/constant";
import ApiResponse from "@/interfaces/ApiResponse";
import NextAuth, { CredentialsSignin, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import apiService from "./services/apiService";
import { api } from "./services/axiosInstance";
import GitHub from "next-auth/providers/github";
import jwt from "jsonwebtoken";
import { Login } from "./interfaces/auth/auth";

class InvalidLoginError extends CredentialsSignin {
	code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	trustHost: true,
	providers: [
		GitHub,
		Credentials({
			name: "Credentials",
			credentials: {
				email: {
					label: "email",
					type: "email",
				},
				password: {
					label: "password",
					type: "password",
				},
			},
			authorize: async (credentials) => {
				console.log("tests", credentials)
				const body = {
					username: credentials?.email,
					password: credentials?.password,
				};
				try {
					const { data } = await apiService.post<ApiResponse<Login>>(
						api,
						`${baseUrl}/login`,
						body
					);
					console.log(data);
					if (data?.data) {
						return {
							id: data.data.id.toString(),
							name: data.data.name,
							email: data.data.email,
							accessToken: data.data.access_token,
						};
					}
					return null;
				} catch (error) {
					throw new InvalidLoginError();
				}
			},
		}),
	],
	debug: process.env.NODE_ENV === "development",
	// secret: process.env.AUTH_SECRET,
	pages: {
		signIn: "/sign-in",
		// error: "/dashboard",
	},

	callbacks: {
		async jwt({ token, user }) {
			console.log("JWT callback called with token and user:", token, user);

			if (user && user.accessToken) {
				token.id = user.id;
				token.accessToken = user.accessToken;

				const decodedToken = jwt.decode(user.accessToken) as {
					user_id: string;
					exp: number;
				};
				token.userId = decodedToken.user_id;
				token.accessTokenExpires = decodedToken.exp * 1000;
			}

			return token;

			// if (Date.now() < token.accessTokenExpires) {
			// 	return token;
			// }

			// return await refreshAccessToken(token);
		},
		async session({ session, token }) {
			session.user.id = token.id as string;
			session.user.accessToken = token.accessToken as string;
			session.user.accessTokenExpires = token.accessTokenExpires as number;
			session.user.userId = token.userId as string;
			return session;
		},
		async redirect({url, baseUrl}) {
      console.log('url', url);
      console.log('baseUrl', baseUrl);
      
      return url.startsWith(baseUrl) ? url : baseUrl + '/dashboard';
    }
	},
});

// async function refreshAccessToken(token) {
// 	try {
// 		const response = await apiService.post<ApiResponse<User>>(
// 			api,
// 			`${baseUrl}/refresh-token`,
// 			{
// 				refreshToken: token.refreshToken,
// 			}
// 		);

// 		const newToken = response.data.access_token;
// 		const decodedToken = jwt.decode(newToken) as {
// 			user_id: string;
// 			exp: number;
// 		};

// 		return {
// 			...token,
// 			accessToken: newToken,
// 			accessTokenExpires: decodedToken.exp * 1000,
// 			refreshToken: response.data.refresh_token,
// 		};
// 	} catch (error) {
// 		console.error("Error refreshing access token:", error);
// 		return {
// 			...token,
// 			error: "RefreshAccessTokenError",
// 		};
// 	}
// }
