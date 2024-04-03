"use client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import adminAxios from "../axios/admin-axios";

type TCheckAuthResponse = { message: string } | { error: string };

const useCheckAuth = () => {
  const checkAuth = async () =>
    adminAxios.post("/cookieok").then((res) => res.data);
  return useQuery<TCheckAuthResponse, AxiosError>({
    queryKey: ["cookieOk", { completed: true }],
    queryFn: checkAuth,
    retry: () => false,
  });
};

export default useCheckAuth;
