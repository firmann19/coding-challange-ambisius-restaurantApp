"use client";

import { Order } from "@/constants";
import { menuFormSchema } from "@/lib/form-schema";
import { useEffect, useState } from "react";
import { z } from "zod";

const DapurForm = () => {
type Menu = z.infer<typeof menuFormSchema>;

//Membuat state menu dan order dengan tipe data yang berasal dari Menu dan Order beserta array
const [menu, setMenu] = useState<Menu[]>([]);
const [order, setOrder] = useState<Order[]>([]);

//Menampilkan data menu dan order
useEffect(() => {
    const localMenu = localStorage.getItem("menu");
    const localOrder = localStorage.getItem("orders");

    setMenu(JSON.parse(localMenu || "[]"));
    setOrder(JSON.parse(localOrder || "[]"));
}, []);


//Membuat maping pada data menu berdasarkan id
const mapMenu: Map<string | number, Menu> = new Map(
    menu.map((menu: Menu) => [menu.id, menu])
);

//Kemudian melakukan filter terhadap data order untuk ditampilkan tiap meja
const joinResult: Order[] = order
    ?.filter((order: Order) => mapMenu.has(order.menuId))
    .map((order: Order) => ({
        ...order,
        menu: mapMenu.get(order.menuId) as Menu,
    }));

return (
    <section className="dapur">
    <div className="h-auto min-h-[300px] p-5 rounded-md bg-slate-100 text-sm">
      <div className="order-tables flex px-2">
        <div className="table-one flex-1">
          <p className="text-xl font-medium">Meja 1</p>
          <div className="table-one-orders mt-2 text-gray-500">
            {joinResult
              ?.filter((order: Order) => order.tableId === "1")
              .map((order: Order, i: number) => {
                return (
                  <p
                    key={i}
                    className="mb-1"
                  >{`${order.quantity}x ${order.menu?.nameMenu}`}</p>
                );
              })}
          </div>
        </div>
        <div className="table-two flex-1">
          <p className="text-xl font-medium">Meja 2</p>
          <div className="table-two-orders mt-2 text-gray-500">
            {joinResult
              ?.filter((order: Order) => order.tableId === "2")
              .map((order: Order, i: number) => {
                return (
                  <p
                    key={i}
                    className="mb-1"
                  >{`${order.quantity}x ${order.menu?.nameMenu}`}</p>
                );
              })}
          </div>
        </div>
        <div className="table-three flex-1">
          <p className="text-xl font-medium">Meja 3</p>
          <div className="table-three-orders mt-2 text-gray-500">
            {joinResult
              ?.filter((order: Order) => order.tableId === "3")
              .map((order: Order, i: number) => {
                return (
                  <p
                    key={i}
                    className="mb-1"
                  >{`${order.quantity}x ${order.menu?.nameMenu}`}</p>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

export default DapurForm;