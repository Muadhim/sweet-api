import { baseUrl } from "@/constant";
import ApiResponse from "@/interfaces/ApiResponse";
import NextAuth, { NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiService from "./services/apiService";
import { api } from "./services/axiosInstance";
import { cookies } from "next/headers";

export const config = {
	trustHost: true,
	providers: [
		CredentialsProvider({
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
			async authorize(credentials, req) {
				let user = null;
				try {
					const { data } = await apiService.post<ApiResponse<User>>(
						api,
						`${baseUrl}/login`,
						{
							username: credentials.email,
							password: credentials.password,
						}
					);
					if (data?.data) {
						user = data.data;
					}
					if (user) {
						const prefix =
							process.env.NODE_ENV === "development" ? "__Dev-" : "";
						cookies().set({
							name: `${prefix}xxx.refresh-token`,
							value: user.refresh_token,
							httpOnly: true,
							sameSite: "strict",
							secure: true,
						} as any);
					}

					return user;
				} catch (error) {
					throw new Error("User not found.");
				}
			},
		}),
	],
	debug: process.env.NODE_ENV === "development",
	secret: process.env.AUTH_SECRET,
	pages: {
		signIn: "/signin",
		error: "/signin",
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				token.id = user.id;
				token.accessToken = user.access_token;
				token.refreshToken = user.refresh_token;
				token.role = "Unknown"; // the user role

				const decodedAccessToken = JSON.parse(
					Buffer.from(user.access_token.split(".")[1], "base64").toString()
				);

				if (decodedAccessToken) {
					token.userId = decodedAccessToken["sub"] as string;
					token.accessTokenExpires = decodedAccessToken["exp"] * 1000;
				}

				// get some info about user from the id token
				const decodedIdToken = JSON.parse(
					Buffer.from(user.id_token.split(".")[1], "base64").toString()
				);

				if (decodedIdToken) {
					token.email = decodedIdToken["email"];
					token.cognitoGroups = decodedIdToken["cognito:groups"];
					token.role = decodedIdToken["cognito:groups"].length
						? decodedIdToken["cognito:groups"][0]
						: "Unknown";
				}
			}

			// if our access token has not expired yet, return all information except the refresh token
			if (
				token.accessTokenExpires &&
				Date.now() < Number(token.accessTokenExpires)
			) {
				const { refreshToken, ...rest } = token;

				return rest;
			}

			// if our access token has expired, refresh it and return the result
			return await refreshAccessToken(token);
		},

		async session({ session, token }) {
			console.log("session => ", session);

			return {
				...session,
				user: {
					...session.user,
					id: token.id as string,
					email: token.email as string,
					cognitoGroups: token.cognitoGroups as string[],
					accessToken: token.accessToken as string,
					accessTokenExpires: token.accessTokenExpires as number,
					role: token.role as string,
				},
				error: token.error,
			};
		},
		authorized({ request, auth }) {
			const { pathname } = request.nextUrl;

			// get the route name from the url such as "/about"
			const searchTerm = request.nextUrl.pathname
				.split("/")
				.slice(0, 2)
				.join("/");

			// if the private routes array includes the search term, we ask authorization here and forward any unauthorized users to the login page
			// if (privateRoutes.includes(searchTerm)) {
			// 	console.log(
			// 		`${!!auth ? "Can" : "Cannot"} access private route ${searchTerm}`
			// 	);
			// 	return !!auth;
			// }
			// if the pathname starts with one of the routes below and the user is already logged in, forward the user to the home page
			if (
				pathname.startsWith("/signin") ||
				pathname.startsWith("/forgot-password") ||
				pathname.startsWith("/signup")
			) {
				const isLoggedIn = !!auth;

				if (isLoggedIn) {
					return Response.redirect(new URL("/dashboard", request.nextUrl));
				}

				return true;
			}

			return true;
		},
	},
} satisfies NextAuthConfig;

export const { auth, handlers } = NextAuth(config);

async function refreshAccessToken(token: any) {
	// this is our refresh token method
	console.log("Now refreshing the expired token...");
	try {
		const { data, status, message } = await apiService.post<ApiResponse<User>>(
			api,
			"/refresh-token",
			{
				refreshToken: token,
			}
		);

		if (status != 200 && status != 201) {
			console.log("The token could not be refreshed!");
			throw data;
		}

		console.log("The token has been refreshed successfully.");

		// get some data from the new access token such as exp (expiration time)
		const accessToken = data?.data?.access_token;
		const tokenSegments = accessToken ? accessToken.split(".") : [];
		const tokenSegment = tokenSegments[1];

		if (tokenSegment) {
			const decodedAccessToken = JSON.parse(
				Buffer.from(tokenSegment, "base64").toString()
			);

			return {
				...token,
				accessToken: data?.data?.access_token,
				refreshToken: data?.data?.refresh_token ?? token.refreshToken,
				idToken: data?.data?.id_token,
				accessTokenExpires: decodedAccessToken["exp"] * 1000,
				error: "",
			};
		}
	} catch (error) {
		console.log(error);

		// return an error if somethings goes wrong
		return {
			...token,
			error: "RefreshAccessTokenError", // attention!
		};
	}
}
