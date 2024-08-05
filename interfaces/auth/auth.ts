import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface User {
		accessToken?: string;
		accessTokenExpires?: number;
		userId?: string;
	}

	interface Session extends DefaultSession {
		user: User & DefaultSession["user"];
	}
}

export interface Login {
	id: number;
	name: string;
	email: string;
	access_token: string;
}
