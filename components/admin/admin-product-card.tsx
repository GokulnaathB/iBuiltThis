import { ProductType } from "@/types";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import AdminActions from "./admin-actions";
import { cn } from "@/lib/utils";
import AdminDeleteProduct from "./admin-delete-product";

export default async function AdminProductCard({
  product,
}: {
  product: ProductType;
}) {
  return (
    <Card className="border rounded-lg p-6 bg-background hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="w-full space-y-4">
          <CardTitle className="text-xl font-semibold flex items-center justify-between">
            <p>{product.name}</p>
            <Badge
              className={cn(
                product.status === "pending" &&
                  "bg-yellow-600/10 text-yellow-600 border-yellow-600",
                product.status === "approved" &&
                  "bg-green-500/10 text-green-600 border-green-500",
                product.status === "rejected" &&
                  "bg-red-500/10 text-red-500 border-red-500",
              )}
            >
              {product.status}
            </Badge>
          </CardTitle>
          <CardDescription className="flex flex-col gap-4">
            {product.tagline}
            <div className="flex items-center gap-2">
              {product.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-bold">By: </span>
                {product.submittedBy}
              </p>
              <p>
                {product.createdAt
                  ? new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(product.createdAt?.toISOString() ?? ""))
                  : ""}
              </p>
              <p>
                <a href={product.websiteUrl ?? ""}>Visit Website</a>
              </p>
            </div>
          </CardDescription>
          <CardFooter>
            <AdminDeleteProduct id={product.id} />
          </CardFooter>
        </div>
        <div className="lg:shrink-0">
          <AdminActions status={product.status ?? ""} productId={product.id} />
        </div>
      </div>
    </Card>
  );
}
