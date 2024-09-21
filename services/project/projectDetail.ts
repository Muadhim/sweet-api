import { IProjectTreeResponse } from "@/interfaces/ProjectTree";
import apiService from "../apiService";
import IApiResponse from "@/interfaces/ApiResponse";
import { api } from "../axiosInstance";
import { apiVersion } from "@/constant";
import { useMutation, useQuery } from "react-query";
import { TMethod } from "@/interfaces/Method";

const getProjectTree = async (id: number | null) => {
  const { data, status, message } = await apiService.get<
    IApiResponse<IProjectTreeResponse>
  >(api, `${apiVersion}/project/${id}/tree`);
  if (status !== 200) throw new Error(message);
  return data;
};

const createFolder = async (body: {
  name: string;
  project_id: number;
  parent_id: number | null;
}) => {
  const { data, status, message } = await apiService.post<IApiResponse<null>>(
    api,
    `${apiVersion}/project-folder`,
    body
  );
  if (status !== 201) throw new Error(message);
  return data;
};

const updateFolder = async (body: {
  id: number;
  name: string | null;
  parent_id: number | null;
}) => {
  const { data, status, message } = await apiService.put<IApiResponse<null>>(
    api,
    `${apiVersion}/project-folder`,
    body
  );
  if (status !== 200 && status !== 201) throw new Error(message);
  return data;
};

const deleteFolder = async (id: number) => {
  const { data, status, message } = await apiService.delete<IApiResponse<null>>(
    api,
    `${apiVersion}/project-folder/${id}`
  );
  if (status !== 200) throw new Error(message);
  return data;
};

const createApi = async (body: {
  name: string;
  folder_id: number;
  method: TMethod;
}) => {
  const { data, status, message } = await apiService.post<IApiResponse<null>>(
    api,
    `${apiVersion}/project-api`,
    body
  );
  if (status !== 201) throw new Error(message);
  return data;
};

const updateApi = async (body: {
  id: number;
  name: string;
  method: TMethod;
  folder_id: number;
}) => {
  const { data, status, message } = await apiService.put<IApiResponse<null>>(
    api,
    `${apiVersion}/project-api`,
    body
  );
  if (status != 200 && status != 201) throw new Error(message);
  return data;
};

const deleteApi = async (id: number) => {
  const { data, status, message } = await apiService.delete<IApiResponse<null>>(
    api,
    `${apiVersion}/project-api/${id}`
  );
  if (status !== 200) throw new Error(message);
  return data;
};

const useGetProjectTree = (id: number | null) =>
  useQuery({
    queryKey: ["projectTree", id],
    queryFn: () => getProjectTree(id),
    enabled: !!id,
  });

const useCreateFolder = () =>
  useMutation({
    mutationKey: ["createFolder"],
    mutationFn: (body: {
      name: string;
      project_id: number;
      parent_id: number | null;
    }) => createFolder(body),
  });

const useUpdateFolder = () =>
  useMutation({
    mutationKey: ["updateFolder"],
    mutationFn: (body: {
      id: number;
      name: string | null;
      parent_id: number | null;
    }) => updateFolder(body),
  });

const useDeleteFolder = () =>
  useMutation({
    mutationKey: ["deleteProjectFolder"],
    mutationFn: (id: number) => deleteFolder(id),
  });

const useCreateApi = () =>
  useMutation({
    mutationKey: ["createApi"],
    mutationFn: (body: { name: string; folder_id: number; method: TMethod }) =>
      createApi(body),
  });

const useUpdateApi = () =>
  useMutation({
    mutationKey: ["updateApi"],
    mutationFn: (body: {
      id: number;
      name: string;
      method: TMethod;
      folder_id: number;
    }) => updateApi(body),
  });

const useDeleteApi = () =>
  useMutation({
    mutationKey: ["deleteApi"],
    mutationFn: (id: number) => deleteApi(id),
  });

export {
  useGetProjectTree,
  useCreateFolder,
  useUpdateFolder,
  useDeleteFolder,
  useCreateApi,
  useUpdateApi,
  useDeleteApi,
};
