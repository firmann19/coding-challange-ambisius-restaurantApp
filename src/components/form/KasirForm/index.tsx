"use client";

import { Button } from '@/components/ui/button';
import Select from "react-select";
import { Order, optionType } from '@/constants'
import { menuFormSchema } from '@/lib/form-schema'
import { useEffect, useState } from 'react';
import { z } from 'zod'

export default function KasirForm() {
    type Menu = z.infer<typeof menuFormSchema>;

    //Membuat state menu berdasarkan tipe data dari Menu
    const [menu, setMenu] = useState<Menu[]>([]);

    //Membuat state order berdasarkan tipe data dari Order
    const [order, setOrder] = useState<Order[]>([]);

    //Membuat state orderById berdasarkan tipe data dari Order
    const [orderById, setOrderById] = useState<Order[]>();

    //Membuat state tableId berdasarkan tipe data dari optionType
    const [tableId, setTableId] = useState<optionType>({
        value: "",
        label: "Nomor Meja",
    });

    //Membuat state isShow dengan tipe data boolean
    const [isShow, setIsShow] = useState<boolean>(false);
    
    //Membuat select Nomor Meja berdasarkan tipe data dari optionType
    let tableOptions: optionType[] = [{ value: "", label: "Nomor Meja" }];

    //Menampilkan data menu dan order
    useEffect(() => {
        const localMenu = localStorage.getItem("menu") || "[]";
        const localOrder = localStorage.getItem("orders") || "[]";

        setMenu(JSON.parse(localMenu));
        setOrder(JSON.parse(localOrder));
    }, []);

    //Melakukan pembuatan id unik dengan tipe data string
    const uniqueId = new Set<string>();

    //Melakukan filter terhadap order yang dipilih
    const filterOrder = order?.filter((order: Order) => {
        if (!uniqueId.has(order.tableId)) {
            uniqueId.add(order.tableId);
            return true;
        }

        return false;
    });

    //Melakukan filter dan maping pada order beserta menu 
    filterOrder
        ?.sort((a: Order, b: Order) => Number(a.tableId) - Number(b.tableId))
        .map((order: Order) => {
            tableOptions.push({
                value: order.tableId,
                label: order.tableId,
            });
        });

    const mapMenus = new Map<string | number, Menu>(
        menu?.map((menu: Menu) => [menu.id, menu])
    );

    //Menampilkan hasil dari order yang sudah di filter
    const Result = order
        ?.filter((order: Order) => mapMenus.has(order.menuId))
        .map((order: Order) => ({
            ...order,
            menu: mapMenus.get(order.menuId),
        }));


    //Melakukan submit/print
    const handlePrint = (): void => {
        setOrderById(
            Result.filter((order: Order) => order.tableId === tableId.value)
        );

        setIsShow(true);
    };

    //Melakukan delete
    const handleDelete = (): void => {
        const deleteById = order?.filter(
            (order: Order) => order.tableId !== tableId.value
        );
        localStorage.setItem("orders", JSON.stringify(deleteById));
        setOrder(deleteById);

        setTableId(tableOptions[0]);
        setIsShow(false);
    };

    return (
        <section className="kasir">
            <div className="h-auto min-h-[300px] p-5 rounded-md bg-slate-100 text-sm">
                <div className="flex justify-between mb-2">
                    <div className="flex w-2/4">
                        <div className="grow mr-2">
                            <p className="mb-2">Meja</p>
                            <Select
                                value={tableId}
                                options={tableOptions}
                                onChange={(option) => {
                                    setTableId({
                                        value: option?.value || "",
                                        label: option?.label || "",
                                    });
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: "black",
                                    },
                                })}
                                placeholder="Nomor Meja"
                                instanceId="menu"
                            />
                        </div>
                        <div className=" mt-auto">
                            <Button
                                onClick={handlePrint}
                                className="text-right bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded-md disabled:opacity-50"
                                disabled={tableId.value === ""}
                            >
                                Print Struk
                            </Button>
                        </div>
                    </div>
                    {tableId.value ? (
                        <div className="mt-auto">
                            <Button
                                onClick={handleDelete}
                                className="text-right bg-red-800  hover:bg-zinc-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
                                disabled={tableId.value === ""}
                            >
                                Kosongkan Meja
                            </Button>
                        </div>
                    ) : null}
                </div>
                {isShow ? (
                    <div className="overflow-auto p-4">
                        <table className="table-auto w-full text-left">
                            <thead className="align-stretch text-zinc-400">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-right w-[100px]">Jumlah</th>
                                    <th className="h-12 px-4 text-left">Menu</th>
                                    <th className="h-12 px-4 text-right">Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menu
                                    ? orderById?.map((order: Order, i: number) => {
                                        return (
                                            <tr key={i} className="border-b">
                                                <td className="p-4 text-right">{order.quantity}</td>
                                                <td className="p-4 align-middle">
                                                    {order.menu?.nameMenu}
                                                </td>
                                                <td className="flex justify-end p-4">Gratis</td>
                                            </tr>
                                        );
                                    })
                                    : null}
                            </tbody>
                        </table>

                        <p className="text-center text-gray-500 font mt-5">
                            Terima kasih sudah makan di{" "}
                            <span className="font-bold">Restoran</span>
                        </p>
                    </div>
                ) : null}
            </div>
        </section>
    )
}
