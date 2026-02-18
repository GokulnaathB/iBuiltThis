"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validations";
import { db } from "@/db";
import { products } from "@/db/schema";
import z from "zod";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type FormState = {
  success: boolean;
  errors: Record<string, string[]>;
  message: string;
};

export const addProductAction = async (
  prevState: FormState | undefined,
  formData: FormData,
) => {
  //   Checking if the user is authenticated or not.
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product!",
        errors: {},
      };
    }
    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
        errors: {},
      };
    }
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

    // logged in! so, extract data:
    const rawFormData = Object.fromEntries(formData.entries());

    // validate the data
    const validatedData = productSchema.safeParse(rawFormData);
    if (!validatedData.success) {
      console.log(validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Invalid data",
      };
    }
    const data = validatedData.data;
    const { name, slug, tagline, description, websiteUrl, tags } = data;
    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags,
      status: "pending",
      submittedBy: userEmail,
      organizationId: orgId,
      userId,
    });
    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed shortly.",
      errors: {},
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed. Please check your inputs!",
      };
    }
    return {
      success: false,
      errors: { e: ["failed"] },
      message: "Failed to submit product!",
    };
  }
};

export async function upvoteProductAction(productId: number) {
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      console.log("User not signed in");
      return {
        success: false,
        message: "You must be signed in to upvote a product",
        errors: {},
      };
    }
    if (!orgId) {
      console.log("User not a member of an organization");
      return {
        success: false,
        message: "You must be a member of an organization to upvote a product",
        errors: {},
      };
    }

    await db
      .update(products)
      .set({ voteCount: sql`${products.voteCount} + 1` })
      .where(eq(products.id, productId));
    revalidatePath("/");
    return {
      success: true,
      message: "Product upvoted successfully",
      errors: {},
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to upvaote product",
      errors: {},
    };
  }
}

export async function downvoteProductAction(productId: number) {
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      console.log("User not signed in");
      return {
        success: false,
        message: "You must be signed in to downvote a product",
        errors: {},
      };
    }
    if (!orgId) {
      console.log("User not part of an organization");
      return {
        success: false,
        message: "Only users part of an organization can downvote products",
        errors: {},
      };
    }
    await db
      .update(products)
      .set({ voteCount: sql`GREATEST(${products.voteCount} - 1, 0)` })
      .where(eq(products.id, productId));
    revalidatePath("/");
    return {
      success: true,
      message: "Product downvoted successfully",
      errors: {},
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Couldn't upvote, failed!",
      errors: {},
    };
  }
}
