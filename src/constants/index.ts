import { EnumValues } from "zod";

export type optionType = {
  id: string;
  label: string;
};

export const MENU_OPTIONS: optionType[] = [
  {
    id: "Ayam bakar",
    label: "Ayam bakar",
  },
  {
    id: "Sate",
    label: "Sate",
  },
  {
    id: "Nasi Goreng",
    label: "Nasi Goreng",
  },
];

export const KUANTITAS_OPTIONS: optionType[] = [
  {
    id: "1",
    label: "1",
  },
  {
    id: "2",
    label: "2",
  },
  {
    id: "3",
    label: "3",
  },
];

export const NOMOR_MEJA_OPTIONS: optionType[] = [
  {
    id: "1",
    label: "1",
  },
  {
    id: "2",
    label: "2",
  },
  {
    id: "3",
    label: "3",
  },
];
