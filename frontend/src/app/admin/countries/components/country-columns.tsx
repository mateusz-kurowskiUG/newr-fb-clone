"use client";
import ICountry from "@/models/ICountry";
import { ColumnDef, Getter } from "@tanstack/react-table";
import Image from "next/image";
import ThSortableItem from "./th-sortable-item";

const showCellValueOrNoData = ({ getValue }: { getValue: Getter<unknown> }) =>
  getValue() || "No data";

const countryColumns: ColumnDef<ICountry>[] = [
  {
    accessorKey: "index",
    meta: { hidden: false, accessorKey: "index", name: "Index" },
    header: ({ column }) => <ThSortableItem column={column} text={"Index"} />,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "id",
    meta: { hidden: false, accessorKey: "id", name: "ID" },
    header: ({ column }) => <ThSortableItem column={column} text={"ID"} />,
  },
  {
    accessorKey: "flag_emoji",
    meta: { hidden: false, accessorKey: "flag_emoji", name: "Flag Emoji" },
    header: ({ column }) => (
      <ThSortableItem column={column} text={"Flag Emoji"} />
    ),
  },
  {
    accessorKey: "flag_svg",
    meta: { hidden: true, accessorKey: "flag_svg", name: "Flag SVG" },

    header: ({ column }) => (
      <ThSortableItem column={column} text={"Flag SVG"} />
    ),
    cell: ({ row }) => (
      <Image
        width={300}
        height={300}
        alt={row.getValue("flag_alt") || row.getValue("name_eng")}
        src={row.getValue("flag_svg")}
      />
    ),
  },
  {
    accessorKey: "flag_alt",
    meta: { hidden: true, accessorKey: "flag_alt", name: "Flag Alt" },
    header: ({ column }) => (
      <ThSortableItem column={column} text={"Flag Alt"} />
    ),
    cell: showCellValueOrNoData,
  },
  {
    accessorKey: "name_eng",
    meta: { hidden: false, accessorKey: "name_eng", name: "English Name" },
    header: ({ column }) => (
      <ThSortableItem column={column} text={"Name ENG"} />
    ),
    aggregationFn: "count",
  },
  {
    accessorKey: "name_pol",
    meta: { hidden: false, accessorKey: "name_pol", name: "Polish Name" },
    header: ({ column }) => (
      <ThSortableItem column={column} text={"Name POL"} />
    ),
  },
  {
    accessorKey: "phone_code_root",
    meta: {
      hidden: false,
      accessorKey: "phone_code_root",
      name: "Phone Code Root",
    },
    header: ({ column }) => (
      <ThSortableItem column={column} text={"Phone Code Root"} />
    ),
    cell: showCellValueOrNoData,
  },
  {
    accessorKey: "actions",
    meta: { hidden: true, accessorKey: "actions", name: "Actions" },
    header: ({ column }) => (
      <ThSortableItem column={column} text={"Actions"} disabled />
    ),
    cell: () => <div>Dropdown here</div>,
  },
];

export default countryColumns;
