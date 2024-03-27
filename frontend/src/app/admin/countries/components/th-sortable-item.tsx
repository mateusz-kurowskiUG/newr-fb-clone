"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React from "react";

function ThSortableItem({
  text,
  column,
  disabled,
}: {
  text: string;
  column: any;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      disabled={disabled ? disabled : false}
    >
      {text}
      {disabled ? null : <ArrowUpDown className="ml-2 h-4 w-4" />}
    </Button>
  );
}

export default ThSortableItem;
