import { handleAxiosError } from "@/common/exceptions/api-error";
import axiosInstance from "..";

export interface CreatePlansPayload {
  nome: string;
  descricao: string;
  precoBase: number;
}

export const getAllPlans = async () => {
  try {
    const response = await axiosInstance.get("/plans?page=1&limit=5");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getPlanById = async (uuid: string) => {
  try {
    const response = await axiosInstance.get(`/plans/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const createPlan = async (payload: CreatePlansPayload) => {
  try {
    const response = await axiosInstance.post("/plans", payload);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updatePlan = async (
  payload: Partial<CreatePlansPayload>,
  uuid: string,
) => {
  try {
    const response = await axiosInstance.patch(`/plans/${uuid}`, payload);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const deletePlan = async (uuid: string) => {
  try {
    const response = await axiosInstance.delete(`/plans/${uuid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
