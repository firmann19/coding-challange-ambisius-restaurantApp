"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MENU_OPTIONS, optionType } from '@/constants'
import { OrderForm, menuFormSchema } from '@/lib/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { z } from 'zod';

export default function OrderForm() {
	type Menu = z.infer<typeof menuFormSchema>;

	const [form, setForm] = useState<OrderForm>({
		id: "",
		menuId: { value: "", label: "Pilih Menu" },
		quantity: { value: 0, label: "Kuantitas" },
	});

	const [menu, setMenu] = useState<Menu[] | []>();
	let menuOptions: optionType[] = [{ value: "", label: "Pilih menu" }];
	const quantityOptions: optionType[] = [
		{ value: 0, label: "Kuantitas" },
		{ value: 1, label: "1" },
		{ value: 2, label: "2" },
		{ value: 3, label: "3" },
	];

	useEffect(() => {
		const localMenus = localStorage.getItem('menu');
		setMenu(JSON.parse(localMenus || "[]"));
	}, []);

	menu?.map((menu: Menu) => {
		menuOptions.push({
			value: menu.id,
			label: menu.menu,
		});
	});

	const onSubmit = (data: Order) => {
		//Menambahkan data baru ke array menu
		setOrder((prev) => [...prev, data]);
		//Membersihkan input formulir
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
				<Tabs defaultValue="meja1">
					<TabsList className="mb-8">
						<TabsTrigger value="meja1">Meja 1</TabsTrigger>
						<TabsTrigger value="meja2">Meja 2</TabsTrigger>
						<TabsTrigger value="meja3">Meja 3</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className='flex gap-4'>
					<FormField
						control={form.control}
						name="pilih_menu"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Menu</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-[450px]">
											<SelectValue placeholder="Pilih Menu" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{menuMakanan.map(
											(
												item: optionType,
												i: number
											) => (
												<SelectItem
													key={item.id + i}
													value={item.id}
												>
													{item.label}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="kuantitas"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Kuantitas</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-[200px]">
											<SelectValue placeholder="Kuantitas" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{KUANTITAS_OPTIONS.map(
											(
												item: optionType,
												i: number
											) => (
												<SelectItem
													key={item.id + i}
													value={item.id}
												>
													{item.label}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='mt-3'>
					<Button size="sm">Tambahkan</Button>
				</div>
			</form>
		</Form >
	)
}
