"use client";

import Select from "react-select";
import { Button } from '@/components/ui/button';
import { Order, optionType } from '@/constants'
import { OrderForm, menuFormSchema } from '@/lib/form-schema'
import { useEffect, useState } from 'react';
import { z } from 'zod';

const OrderForm = () => {
	type Menu = z.infer<typeof menuFormSchema>;

	const [form, setForm] = useState<OrderForm>({
		tableId: "",
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
			label: menu.nameMenu,
		});
	});

	const onSubmit = (): void => {
		let localStorageOrders: Array<Order> | string | null =
			localStorage.getItem("orders");

		if (localStorageOrders === null) {
			localStorage.setItem("orders", "[]");
			localStorageOrders = localStorage.getItem("orders") || "[]";
		}

		localStorageOrders = JSON.parse(localStorageOrders) as Array<Order>;

		localStorageOrders.push({
			id: Math.floor(100000 + Math.random() * 900000).toString(),
			tableId: form.tableId,
			menuId: form.menuId.value,
			quantity: form.quantity.value,
		});

		setForm({
			tableId: "",
			menuId: menuOptions[0],
			quantity: quantityOptions[0],
		});

		localStorage.setItem("orders", JSON.stringify(localStorageOrders));
	}

	return (
		<section className="order">
			<div className="h-auto min-h-[300px] p-5 rounded-md bg-slate-100 text-sm">
				<div className="border rounded-xl bg-white mb-4">
					<ul className="flex">
						<li className="flex-1">
							<button
								onClick={() => {
									form.tableId === "1"
										? setForm({ ...form, tableId: "" })
										: setForm({ ...form, tableId: "1" });
								}}
								className={`${form.tableId === "1"
									? "bg-blue-700 text-white"
									: "hover:bg-slate-50"
									} w-full h-[70px] rounded-l-xl border-r px-3 py-2`}
							>
								Meja 1
							</button>
						</li>
						<li className="flex-1">
							<button
								onClick={() => {
									form.tableId === "2"
										? setForm({ ...form, tableId: "" })
										: setForm({ ...form, tableId: "2" });
								}}
								className={`${form.tableId === "2"
									? "bg-blue-700 text-white"
									: "hover:bg-slate-50"
									} w-full h-[70px] px-3 py-2`}
							>
								Meja 2
							</button>
						</li>
						<li className="flex-1">
							<button
								onClick={() => {
									form.tableId === "3"
										? setForm({ ...form, tableId: "" })
										: setForm({ ...form, tableId: "3" });
								}}
								className={`${form.tableId === "3"
									? "bg-blue-700 text-white"
									: "hover:bg-slate-50"
									} w-full h-[70px] rounded-r-xl border-l px-3 py-2`}
							>
								Meja 3
							</button>
						</li>
					</ul>
				</div>
				<div className="flex mb-2">
					<div className="grow mr-2">
						<p className="mb-2">Menu</p>
						<Select
							value={form.menuId}
							options={menuOptions}
							onChange={(option) => {
								setForm({
									...form,
									menuId: {
										value: option?.value || "",
										label: option?.label || "",
									},
								});
							}}
							theme={(theme) => ({
								...theme,
								colors: {
									...theme.colors,
									primary: "black",
								},
							})}
							placeholder="Pilih menu"
							instanceId="menu"
						/>
					</div>
					<div className="w-[130px]">
						<p className="mb-2">Jumlah</p>
						<Select
							value={form.quantity}
							options={quantityOptions}
							onChange={(option) => {
								setForm({
									...form,
									quantity: {
										value: Number(option?.value),
										label: option?.label || "",
									},
								});
							}}
							theme={(theme) => ({
								...theme,
								colors: {
									...theme.colors,
									primary: "black",
								},
							})}
							placeholder="Kuantitas"
							instanceId="qty"
						/>
					</div>
				</div>
				<div className="text-right">
					<Button
						onClick={onSubmit}
						className="text-right bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded-md disabled:opacity-50"
						disabled={
							form.tableId === "" ||
							form.menuId.value === "" ||
							form.quantity.value === 0
						}
					>
						Tambah
					</Button>
				</div>
			</div>
		</section>
	)
}

export default OrderForm