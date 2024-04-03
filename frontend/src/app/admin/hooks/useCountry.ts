"use client";
import ICountry from "@/models/ICountry";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import adminAxios from "../axios/admin-axios";

const useCountries = () => {
  const fetchCountries = async () =>
    adminAxios.get("/countries").then((res) => res.data);
  return useQuery<ICountry[], AxiosError>({
    queryKey: ["countries", { completed: true }],
    queryFn: fetchCountries,
  });
};

export default useCountries;
