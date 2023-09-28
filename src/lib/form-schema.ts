import { z } from "zod";
import { optionType } from "@/constants";

export const menuFormSchema = z.object({
	id: z.string(),
	nameMenu: z.string({ required_error: "Name is required" }),
});

export const kasirFormSchema = z.object({
	nomor_meja: z.string({ required_error: "Nomor Meja harus diisi" }),
});

export type OrderForm = { tableId: string; menuId: optionType; quantity: optionType };