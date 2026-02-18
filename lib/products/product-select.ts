// All the get queries that we want live here.

import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";

export async function getFeaturedProducts() {
  // "use cache"; // “If this function is called while Next.js is building HTML ahead of time (preparing the static shell), its result is allowed to be baked into that HTML.”
  const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));
  return productsData;
}

// Doesn't make sense to use the cached result of getFeaturedProducts in getRecentlyLaunchedProducts because the recently launched products could be updated dynamically all the time. So, we can use the connection API from NextJS that allows us to simply get this data at runtime. But in order for us to use connection and always get the latest fresh data, we could not use it with use cache. So, let's create getAllProducts (later renamed it as getAllApprovedProducts) function and use that in getRecentlyLaunchedProducts along with the connection API.

export async function getAllApprovedProducts() {
  "use cache";
  const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));
  return productsData;
}

export async function getAllProducts() {
  const productsData = await db
    .select()
    .from(products)
    .orderBy(desc(products.voteCount));
  return productsData;
}

export async function getRecentlyLaunchedProducts() {
  await connection(); // allows us to indicate the rendering should wait for an incoming user request before continuing. And that's a really great way to always dynamically render at runtime and not statically at build time.
  // const productsData = await getFeaturedProducts();
  let productsData = await getAllProducts();
  productsData = productsData.filter((p) => p.status === "approved");
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return productsData.filter(
    (product) =>
      product.createdAt &&
      new Date(product.createdAt.toISOString()) >= oneWeekAgo,
  );

  // In RecentlyLaunchedProducts component, we have used the "use cache" directive. We can't do that anymore if we want dynamic data. So, we'll remove that directive. RecentlyLaunchedProducts component now becomes a dynamic route, no longer static because we removed "use cache". Summary: the await connection() makes RecentlyLaunchedProducts dynamic, due to which we could not make it (the component) cacheable. So, we should wrap the RecentlyLaunchedProducts component with Suspense.
}

export async function getProductBySlug(slug: string) {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug));
  return product ? product[0] : null;
}
