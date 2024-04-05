import { useForm } from "react-hook-form";
import { z } from "zod";
import loginFormSchema from "../auth/schema/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
const useLoginForm = () =>
  useForm<z.infer<typeof loginFormSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginFormSchema),
  });

export default useLoginForm;
