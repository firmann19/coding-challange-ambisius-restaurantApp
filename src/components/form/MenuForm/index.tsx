"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { menuFormSchema } from "@/lib/form-schema";
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Menu_LISTING_COLUMNS } from "@/components/constants";
import FieldInput from "@/components/FieldInput";
import { Button } from "@/components/ui/button";

type Menu = z.infer<typeof menuFormSchema>;

const MenuForm = ({ initialData }: { initialData?: Menu }) => {
	const form = useForm<Menu>({
		resolver: zodResolver(menuFormSchema),
		defaultValues: initialData,
	})

	const [menu, setMenu] = useState<Menu[]>([]);
	const [menus, setMenus] = useState<string>("");

	const onSubmit = (data: Menu) => {
		//Menambahkan data baru ke array menu
		setMenu((prev) => [...prev, data]);
		//Membersihkan input formulir
		form.reset();
	}

	useEffect(() => {
		//Mengubah array menu ke string JSON
		const json = JSON.stringify(menu);
		//Menyimpan string JSON ke localstorage dengan kunci "menu"
		localStorage.setItem("menu", json);
	}, [menu])

	
	const json = localStorage.getItem('menu');
	const menuMakanan = json ? JSON.parse(json) : [];

	const handleDeleteMenu = (id: string) => {
		const updatedMenu:any = menu.filter((menuItem) => menuItem.id !== id);
		setMenu(updatedMenu);
		localStorage.setItem("menu", JSON.stringify(updatedMenu));
	  };


	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
					<FieldInput
						title="Informasi Menu"
						subtitle="Ini adalah daftar menu restoran kami"
					>
						<FormField
							control={form.control}
							name='menu'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className="w-[450px]"
											placeholder="Tambahkan menu..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex ms-4">
							<Button size="sm">Tambahkan</Button>
						</div>
					</FieldInput>
				</form>
			</Form >

			<div className="mt-5">
				<Table>
					<TableHeader>
						<TableRow>
							{Menu_LISTING_COLUMNS.map(
								(item: string, i: number) => (
									<TableHead key={item + i}>{item}</TableHead>
								)
							)}
							<TableHead>Hapus?</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{menuMakanan.map((item: any) => (
							item && (
								item.id && item.menu ? (
									<TableRow key={item.id}>
										<TableCell>{item.id}</TableCell>
										<TableCell>{item.menu}</TableCell>
										<TableCell><Button onClick={() => handleDeleteMenu(item.id)}>Hapus Data</Button></TableCell>
									</TableRow>

								) : null)
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default MenuForm;