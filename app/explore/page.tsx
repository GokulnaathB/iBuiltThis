import SectionHeader from "@/components/common/section-header";
import ProductExplorer from "@/components/products/ProductExplorer";
import { getAllApprovedProducts } from "@/lib/products/product-select";
import { CompassIcon } from "lucide-react";

export default async function ExplorePage() {
  const products = await getAllApprovedProducts();
  return (
    <div className="py-20">
      <div className="wrapper">
        <SectionHeader
          title="Explore All Products"
          icon={CompassIcon}
          description="Browse and discover amazing projects from our community"
        />
        <ProductExplorer products={products} />
      </div>
    </div>
  );
}
