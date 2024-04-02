import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export default loginFormSchema;
