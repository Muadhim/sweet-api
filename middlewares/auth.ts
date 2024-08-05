import { auth } from "@/auth";

export default auth((req) => {
	console.log('mid req; ', req)
	req.auth
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
