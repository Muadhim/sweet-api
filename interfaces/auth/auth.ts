import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface User {
		cognito_groups: string[];
		access_token: string;
		refresh_token: string;
		id_token: string;
		exp: number;
		role: string;
	}

	interface Session {
		user: User & DefaultSession["user"];
		expires: string;
		error: string;
	}
}
