export default interface ApiResponse<T> {
	data: T | null;
	status: number | boolean | string;
	message: string;
}
