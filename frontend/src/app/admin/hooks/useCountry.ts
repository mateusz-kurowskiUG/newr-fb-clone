"use client";
import ICountry from "@/models/ICountry";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCountries = () => {
    const fetchCountries = async () => axios.get("http://localhost:5000/api/countries").then((res) => res.data)
    return useQuery<ICountry[],Error>({queryKey:["countries",{completed:true}], queryFn: fetchCountries})
};

export default useCountries