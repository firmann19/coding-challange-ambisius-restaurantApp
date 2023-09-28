export type optionType = {
  value: string | number;
  label: string;
};

export type Menu = {
  id: string;
  nameMenu: string;
};

export type Order = {
  id: string;
  tableId: string;
  menuId: string | number;
  quantity: string | number;
  menu?: Menu;
};

export const defaultMenus: string = `[{"id":"45342","nameMenu":"Ayam Kecap Manis"},{"id":"12234","nameMenu":"Nasi Goreng"}]`;
