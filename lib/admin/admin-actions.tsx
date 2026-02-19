"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductType } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendApprovalMail, sendRejectionMail } from "./email-actions";

export const approveProductAction = async (product: ProductType) => {
  try {
    await db
      .update(products)
      .set({ status: "approved", approvedAt: new Date() })
      .where(eq(products.id, product.id));
    revalidatePath("/admin");
    await sendApprovalMail(product.submittedBy as string, product.name);
    return {
      success: true,
      message: "Product approved successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to approve product",
    };
  }
};
export const rejectProductAction = async (product: ProductType) => {
  try {
    await db
      .update(products)
      .set({ status: "rejected" })
      .where(eq(products.id, product.id));
    revalidatePath("/admin");
    await sendRejectionMail(
      product.submittedBy as string,
      product.name as string,
    );
    return {
      success: true,
      message: "Product rejected successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to reject product",
    };
  }
};

export const deleteProductAction = async (productId: ProductType["id"]) => {
  try {
    await db.delete(products).where(eq(products.id, productId));
    revalidatePath("/admin");
    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to delete product",
    };
  }
};
