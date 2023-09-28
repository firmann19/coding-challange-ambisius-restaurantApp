"use client";

import { AiFillDelete } from "react-icons/ai";
import { menuFormSchema } from "@/lib/form-schema";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { defaultMenus } from "@/constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MenuForm = () => {
	type Menu = z.infer<typeof menuFormSchema>;

	const [menu, setMenu] = useState<Menu[]>([]);
	const [menus, setMenus] = useState<string>("");

	useEffect(() => {
		let dataMenu = localStorage.getItem("menu");

		if (dataMenu === null) {
			localStorage.setItem("menu", defaultMenus);
			dataMenu = localStorage.getItem("menu") || "[]";
		}
		setMenu(JSON.parse(dataMenu));
	}, [])

	const handleDeleteMenu = (id: string) => {
		const updatedMenu: any = menu.filter((menuItem) => menuItem.id !== id);
		setMenu(updatedMenu);
		localStorage.setItem("menu", JSON.stringify(updatedMenu));
	};

	const onSubmit = (): void => {
		menu.push({
			id: Math.floor(100000 + Math.random() * 900000).toString(),
			nameMenu: menus,
		});

		localStorage.setItem("menu", JSON.stringify(menu));
		setMenu(menu);
		setMenus("");
	};

	return (
			<section className="menu">
				<div className="h-auto p-5 rounded-md bg-slate-100 text-sm">
					<p>Menu Makanan</p>
					<div className="flex my-2">
						<input
							value={menus}
							onChange={(e) => {
								setMenus(e.target.value);
							}}
							className="border rounded-md w-full py-2 px-3 focus:outline-black"
							type="text"
							name="menu"
							placeholder="Tambahkan di sini ..."
						/>
						<Button
							onClick={onSubmit}
							className="ml-2 bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded-md disabled:opacity-50"
							disabled={!menus}
						>
							Tambah
						</Button>
					</div>

					<div className="overflow-auto p-4">
						<Table className="table-auto w-full text-left">
							<TableHeader className="align-stretch text-zinc-400">
								<TableRow className="border-b">
									<TableHead className="h-12 px-4 text-left w-[100px]">ID</TableHead>
									<TableHead className="h-12 px-4 text-left">Menu</TableHead>
									<TableHead className="h-12 px-4 text-right">Hapus?</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{menu
									? menu?.map((menu: Menu) => {
										return (
											<TableRow key={+menu.id} className="border-b">
												<TableCell className="p-4 align-middle">{menu.id}</TableCell>
												<TableCell className="p-4 align-middle">{menu.nameMenu}</TableCell>
												<TableCell className="flex justify-end p-4">
													<button onClick={() => handleDeleteMenu(menu.id)}>
														<AiFillDelete className="text-red-800" size={20} />
													</button>
												</TableCell>
											</TableRow>
										);
									})
									: null}
							</TableBody>
						</Table>

						<p className="text-center text-gray-500 mt-5">
							Daftar Menu Restoran Anda
						</p>
					</div>
				</div>
			</section>
	);
};

export default MenuForm;