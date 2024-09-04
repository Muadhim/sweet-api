import IApiResponse from "@/interfaces/ApiResponse";
import apiService from "../apiService";
import { IGroup } from "@/interfaces/Group";
import { api } from "../axiosInstance";
import { apiVersion } from "@/constant";
import { useMutation, useQuery } from "react-query";

const getGroups = async () => {
  const { data, status, message } = await apiService.get<
    IApiResponse<IGroup[]>
  >(api, `${apiVersion}/groups`);
  if (status !== 200) throw new Error(message);
  return data;
};

const createGroup = async (body: { name: string }) => {
  const { data, status, message } = await apiService.post<IApiResponse<null>>(
    api,
    `${apiVersion}/group`,
    body
  );
  if (status !== 201) throw new Error(message);
  return data;
};

const useGetGroups = () =>
  useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
    staleTime: 0,
  });

const useCreateGroup = () =>
  useMutation({
    mutationKey: ["createGroup"],
    mutationFn: (body: { name: string }) => createGroup(body),
  });

export { useGetGroups, useCreateGroup };
