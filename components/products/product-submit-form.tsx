"use client"; // this means ProductSubmitForm and whatever is underneath that is all going to be shipped to the browser, to the client.
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { FormField } from "../forms/form-field";
import { Button } from "../ui/button";
import { addProductAction } from "@/lib/products/product-actions";
import { useActionState } from "react";
import { cn } from "@/lib/utils";

type FormState = {
  success: boolean;
  errors: Record<string, string[]>;
  message: string;
};

const initialState: FormState = {
  success: false,
  errors: {},
  message: "",
};

export default function ProductSubmitForm({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
}) {
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState,
  );
  const errors = state.errors ?? {};
  const message = state.message ?? "";
  const success = state.success ?? false;
  return (
    <form className="space-y-6" action={formAction}>
      {!userId ? (
        <p className="pb-1 text-xl text-red-600">Sign-in to submit a product</p>
      ) : !orgId ? (
        <p className="pb-1 text-lg text-red-600">
          You must be a part of an organization to submit a product. Click user
          icon, go to organizations, and select the organization that is named
          the same as your name.
        </p>
      ) : (
        ""
      )}
      {message && (
        <div
          className={cn(
            "p-4 rounded-lg border",
            success
              ? "bg-primary/10 border-primary text-primary"
              : "bg-destructive/10 border-destructive text-destructive",
          )}
          role="alert"
          aria-live="polite"
        >
          {message}
        </div>
      )}
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder="My Awesome Product"
        required={true}
        onChange={() => {}}
        error={errors.name ?? []}
      />
      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="my-awesome-product"
        required={true}
        onChange={() => {}}
        error={errors.slug}
        helperText="URL-friendly version of your product name"
      />
      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="A brief, catchy description"
        required={true}
        onChange={() => {}}
        error={errors.tagline}
      />
      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="Tell us more about your product..."
        required={true}
        onChange={() => {}}
        error={errors.description}
        textarea
      />
      <FormField
        label="Website URL"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="https://www.yourproduct.com"
        required={true}
        onChange={() => {}}
        error={errors.websiteUrl}
        helperText="Enter your product's website or landing page"
      />
      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="AI, Productivity, SaaS"
        required={true}
        onChange={() => {}}
        error={errors.tags}
        helperText="Comma-separated tags (e.g., AI, SaaS, Productivity)"
      />
      <Button type="submit" className="w-full">
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <>
            <SparklesIcon className="size-4" />
            Submit Product{" "}
          </>
        )}
      </Button>
    </form>
  );
}
