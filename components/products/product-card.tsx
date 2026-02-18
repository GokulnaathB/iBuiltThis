"use client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { StarIcon } from "lucide-react";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import VotingButtons from "./voting-buttons";

type Product = InferSelectModel<typeof products>;

export default function ProductCard({ product }: { product: Product }) {
  const hasVoted = true;
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-50">
        <CardHeader className="flex-1 flex items-start justify-between">
          <div className="flex flex-col items-start gap-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {product.name}
              </CardTitle>
              {product.voteCount > 100 && (
                <Badge className="gap-1 bg-primary  text-primary-foreground">
                  <StarIcon className="size-3 fill-current" />
                  Featured
                </Badge>
              )}
            </div>
            <CardDescription>{product.description}</CardDescription>
          </div>
          <VotingButtons
            hasVoted={hasVoted}
            voteCount={product.voteCount}
            productId={product.id}
          />
        </CardHeader>
        <CardFooter>
          <div className="flex items-center gap-2">
            {product.tags?.map((tag) => (
              <Badge variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
