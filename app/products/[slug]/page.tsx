"use cache"; // Put the result into the static html shell.

import SectionHeader from "@/components/common/section-header";
import {
  getFeaturedProducts,
  getProductBySlug,
} from "@/lib/products/product-select";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ExternalLinkIcon,
  Flame,
  StarIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import VotingButtons from "@/components/products/voting-buttons";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const products = await getFeaturedProducts();
  return products.map((product) => ({
    slug: product.slug.toString(),
  })); // NextJS is going to generate all these routes statically. All these products generated at build time.
} // This allows us to tell NextJS which pages need to be dynamically cached; dynamically generated at build time.

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const { name, description, websiteUrl, tags, voteCount, tagline } = product;
  return (
    <div className="py-16">
      <div className="wrapper">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeftIcon className="size-4" /> Back to Explore
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-6">
              <div className="flex-1 min-w-0">
                <div className="mb-6">
                  <SectionHeader
                    title={name}
                    icon={StarIcon}
                    description={tagline ? tagline : ""}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags?.map((tag) => (
                    <Badge variant="secondary" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <h2 className="text-xl font-semibold mt-4 mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
                <div className="border rounded-lg p-6 bg-primary/10">
                  <h2 className="text-lg font-semibold mb-4">
                    Product Details
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Launched",
                        value: new Date(
                          product.createdAt?.toISOString() ?? "",
                        ).toLocaleDateString(),
                        icon: CalendarIcon,
                      },
                      {
                        label: "Submitted by:",
                        value: product.submittedBy,
                        icon: UserIcon,
                      },
                    ].map(({ label, value, icon: Icon }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 text-sm"
                      >
                        {Icon && (
                          <Icon className="size-4 text-muted-foreground" />
                        )}
                        <span className="text-muted-foregrounf">{label}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 mt-6">
            <div className="sticky top-24 space-y-4">
              <div className="border rounded-lg p-6 bg-background">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Support the product
                  </p>
                  <VotingButtons
                    productId={product.id}
                    voteCount={voteCount}
                    hasVoted={true}
                  />
                </div>
                {voteCount > 100 && (
                  <div className="pt-6 border-t">
                    <Badge className="w-full justify-center py-2">
                      <Flame />
                      Featured Product
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
          {websiteUrl && (
            <Button
              asChild
              className="w-full rounded-lg mt-4"
              variant={"outline"}
            >
              <a href={websiteUrl}>
                Visit Website <ExternalLinkIcon className="size-4 ml-2" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
