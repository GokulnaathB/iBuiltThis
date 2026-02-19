"use client";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ProductType } from "@/types";
import {
  approveProductAction,
  rejectProductAction,
} from "@/lib/admin/admin-actions";

export default function AdminActions({
  status,
  product,
}: {
  status: string;
  product: ProductType;
}) {
  const handleApprove = async () => {
    await approveProductAction(product);
  };
  const handleReject = async () => {
    await rejectProductAction(product);
  };
  return (
    <div className="space-y-2">
      {status === "pending" && (
        <div className="flex gap-2">
          <Button
            variant="default"
            className="hover:cursor-pointer"
            onClick={handleApprove}
          >
            <CheckCircleIcon className="size-4" />
            Approve
          </Button>
          <Button
            variant="destructive"
            className="hover:cursor-pointer"
            onClick={handleReject}
          >
            <XCircleIcon className="size-4" />
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}
