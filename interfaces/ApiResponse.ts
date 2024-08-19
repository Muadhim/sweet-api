export default interface IApiResponse<T> {
  data: T | null;
  status: number | boolean | string;
  message: string;
}
