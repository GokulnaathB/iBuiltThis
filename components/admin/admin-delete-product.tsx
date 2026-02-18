"use client";

import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { ProductType } from "@/types";
import { deleteProductAction } from "@/lib/admin/admin-actions";

export default function AdminDeleteProduct({ id }: { id: ProductType["id"] }) {
  const handleDelete = async () => {
    await deleteProductAction(id);
  };
  return (
    <Button variant="outline" onClick={handleDelete}>
      <Trash2Icon className="size-4" />
      Delete
    </Button>
  );
}
