import IApiResponse from "@/interfaces/ApiResponse";
import apiService from "../apiService";
import { api } from "../axiosInstance";
import { apiVersion } from "@/constant";
import { IProject } from "@/interfaces/Project";
import { useMutation, useQuery } from "react-query";

const getProjects = async () => {
  const { data, status, message } = await apiService.get<
    IApiResponse<IProject[]>
  >(api, `${apiVersion}/projects`);
  if (status !== 200) throw new Error(message);
  return data;
};

const getProject = async (id: number) => {
  const { data, status, message } = await apiService.get<
    IApiResponse<IProject>
  >(api, `${apiVersion}/project/${id}`);
  if (status !== 200) throw new Error(message);
  return data;
};

const createProject = async (body: { name: string; member_ids?: number[] }) => {
  const { data, status, message } = await apiService.post<IApiResponse<null>>(
    api,
    `${apiVersion}/project`,
    body
  );
  if (status !== 201) throw new Error(message);
  return data;
};

const updateProjectMember = async (
  id: number,
  body: { member_ids: number[] }
) => {
  const { data, status, message } = await apiService.put<IApiResponse<null>>(
    api,
    `${apiVersion}/project/${id}/members`,
    body
  );
  if (status !== 200 && status !== 201) throw new Error(message);
  return data;
};

const deleteProjectMember = async (
  id: number,
  body: { member_ids: number[] }
) => {
  const { data, status, message } = await apiService.delete<IApiResponse<null>>(
    api,
    `${apiVersion}/project/${id}/members`,
    body
  );
  if (status !== 200 && status !== 201) throw new Error(message);
  return data;
};

const deleteProject = async (id: number) => {
  const { data, status, message } = await apiService.delete<IApiResponse<null>>(
    api,
    `${apiVersion}/project/${id}`
  );
  if (status !== 200 && status !== 201) throw new Error(message);
  return data;
};

const getInviteLink = async (id: number) => {
  const { data, status, message } = await apiService.get<IApiResponse<string>>(
    api,
    `${apiVersion}/project/${id}/invite`
  );
  if (status !== 200) throw new Error(message);
  return data?.data;
};

const useGetProjects = () =>
  useQuery({ queryKey: ["projects"], queryFn: getProjects });
const useGetProject = (id: number) =>
  useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
    enabled: !!id,
  });
const useCreateProject = () =>
  useMutation({
    mutationKey: ["createProject"],
    mutationFn: async (body: { name: string; member_ids?: number[] }) =>
      createProject(body),
  });
const useUpdateProjectMember = () =>
  useMutation({
    mutationKey: ["updateProjectMember"],
    mutationFn: async (args: { id: number; body: { member_ids: number[] } }) =>
      await updateProjectMember(args.id, args.body),
  });

const useDeleteProjectMember = () =>
  useMutation({
    mutationKey: ["deleteProjectMember"],
    mutationFn: async (args: { id: number; body: { member_ids: number[] } }) =>
      await deleteProjectMember(args.id, args.body),
  });

const useDeleteProject = () =>
  useMutation({
    mutationKey: ["deleteProject"],
    mutationFn: async (id: number) => await deleteProject(id),
  });

const useGetInviteLink = (id: number) =>
  useQuery({
    queryKey: ["inviteLink", id],
    queryFn: () => getInviteLink(id),
    enabled: !!id,
  });

export {
  useGetProjects,
  useGetProject,
  useCreateProject,
  useUpdateProjectMember,
  useDeleteProjectMember,
  useDeleteProject,
  useGetInviteLink,
};
