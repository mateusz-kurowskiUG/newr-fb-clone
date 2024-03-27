import { Label } from "@/components/ui/label";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface ICountriesColumnMeta {
  hidden: boolean;
  accessorKey: string;
  name: string;
}

function TableFilterSelector({
  columns,
  setFiltered,
}: {
  columns: ColumnDef<any>[];
  setFiltered: (value: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Label>Filter by:</Label>
      <Select
        onValueChange={(val) => {
          setFiltered(val);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Pick a column" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Columns</SelectLabel>
            {columns.map(({ meta }: { meta: ICountriesColumnMeta }) => {
              if (!meta || meta.hidden) return null;

              return (
                <SelectItem value={meta.accessorKey} key={meta.name}>
                  {meta.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TableFilterSelector;
