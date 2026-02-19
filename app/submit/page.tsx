import SectionHeader from "@/components/common/section-header";
import ProductSubmitForm from "@/components/products/product-submit-form";
import { SparklesIcon } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

export default async function SubmitPage() {
  const { userId, orgId } = await auth();
  return (
    <section className="py-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Submit Your Product"
            icon={SparklesIcon}
            description="Share your creation with the community. Your submission will be reviewed before going live."
          />
        </div>
        <div className="max-w-2xl mx-auto">
          <ProductSubmitForm
            userId={userId as string}
            orgId={orgId as string}
          />
        </div>
      </div>
    </section>
  );
}
