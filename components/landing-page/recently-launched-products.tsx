// "use cache"; removing this directive as we're now fetching the products dynamically using the connection api from NextJS.

import { CalendarIcon, RocketIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import ProductCard from "../products/product-card";
import EmptyState from "../common/empty-state";
import { getRecentlyLaunchedProducts } from "@/lib/products/product-select";
import { Suspense } from "react";

export default async function RecentlyLaunchedProducts() {
  const recentlyLaunchedProducts = await getRecentlyLaunchedProducts();
  return (
    <section className="py-20">
      <div className="wrapper space-y-12">
        <SectionHeader
          title="Recently Launched"
          icon={RocketIcon}
          description="The most recently launched products on the platform."
        />
        {recentlyLaunchedProducts.length > 0 ? (
          <div className="grid-wrapper">
            <Suspense fallback={<div>Loading Products...</div>}>
              {recentlyLaunchedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
        ) : (
          <EmptyState
            message="No products launched in the last week. Check back soon for new launches."
            icon={CalendarIcon}
          />
        )}
      </div>
    </section>
  );
}
