import { baseUrl } from "@/constant";
import ApiResponse from "@/interfaces/ApiResponse";
import apiService from "@/services/apiService";
import { api } from "@/services/axiosInstance";
import { stat } from "fs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
	const body = await request.json();

	const prefix = process.env.NODE_ENV === "development" ? "__Dev-" : "";

	const payload = {
		refreshToken: cookies().get(`${prefix}xxx.refresh-token` as any)?.value,
		userID: body.userID,
	};

	const { data, status, message } = await apiService.post<ApiResponse<any>>(
		api,
		`${baseUrl}/refresh`,
		payload
	);

	return Response.json({
		success: status === 200,
		status: status,
		data,
	});
}
