import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { optionType } from "@/constants";

export const menuFormSchema = z.object({
	id: z.string().default(() => uuidv4()),
	menu: z.string({ required_error: "Name is required" }),
});

export const orderFormSchema = z.object({
	pilih_menu: z.string({ required_error: "Menu harus diisi" }),
	kuantitas: z.string({ required_error: "Jumlah Menu harus diisi" }),
});

export const kasirFormSchema = z.object({
	nomor_meja: z.string({ required_error: "Nomor Meja harus diisi" }),
});

export type OrderForm = { id: string; menuId: optionType; quantity: optionType };