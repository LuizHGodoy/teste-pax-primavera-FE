import { toast } from "@/components/ui/use-toast";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      const errorMessage = data.message || "Erro inesperado. Tente novamente.";

      switch (status) {
        case 400:
          console.error("Erro 400: Requisição inválida", data.message);
          break;
        case 401:
          console.error("Erro 401: Não autorizado.", data.message);
          break;
        case 403:
          console.error("Erro 403: Acesso negado", data.message);
          break;
        case 404:
          console.error("Erro 404: Recurso não encontrado", data.message);
          break;
        case 500:
          console.error("Erro 500: Erro no servidor", data.message);
          break;
        default:
          console.error(`Erro inesperado (${status})`, data.message);
      }

      toast({
        title: "Erro",
        description: errorMessage,
      });
    } else if (error.request) {
      console.error("Nenhuma resposta do servidor. Verifique sua conexão.");
    } else {
      console.error("Erro:", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;