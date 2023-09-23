import { z } from "zod";

export const menuFormSchema = z.object({
	name: z.string({ required_error: "Name is required" }),
});