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
	
	//Membuat state menu bertipe array dan string
	const [menu, setMenu] = useState<Menu[]>([]);
	const [menus, setMenus] = useState<string>("");

	//Menampilkan list menu, jika menu = null maka akan menampilkan list menu default (yang sudah ditetapkan)
	useEffect(() => {
		//Menampilkan data menu
		let dataMenu = localStorage.getItem("menu");

		//Jika data menu = null, maka menampilkan list default menu
		if (dataMenu === null) {
			//setItem digunakan untuk menyimpan data menu (dalam konteks ini defaultMenus yang disimpan) 
			localStorage.setItem("menu", defaultMenus);
			//getItem untuk menampilkan data menu
			dataMenu = localStorage.getItem("menu") || "[]";
		}

		//data menu kemudian di parsing menjadi JSON di localStorage
		setMenu(JSON.parse(dataMenu));
	}, [])

	//Melakukan delete menu berdasarkan id menu tersebut
	const handleDeleteMenu = (id: string) => {
		//Melakukan filter berdasarkan id untuk data menu yang dihapus
		const updatedMenu: any = menu.filter((menuItem) => menuItem.id !== id);
		setMenu(updatedMenu);

		//Data menu disimpan kembali ke localStorage
		localStorage.setItem("menu", JSON.stringify(updatedMenu));
	};

	//Melakukan submit (penambahan) pada menu yang sudah di input
	const onSubmit = (): void => {
		//Melakukan push terhadap id dan menu yang sudah di input
		menu.push({
			id: Math.floor(100000 + Math.random() * 900000).toString(),
			nameMenu: menus,
		});

		//Menyimpan data menu ke localStorage
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