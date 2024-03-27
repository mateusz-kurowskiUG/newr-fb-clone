"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { Table } from "@tanstack/react-table";

function TableFilterInput({
  table,
  columnName,
}: {
  table: Table<any>;
  columnName: string;
}) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter data..."
        value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(columnName)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
}

export default TableFilterInput;
