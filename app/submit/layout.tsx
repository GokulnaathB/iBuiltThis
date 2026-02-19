import { LoaderCircleIcon } from "lucide-react";
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense
        fallback={
          <div className="wrapper">
            <div className="py-20 flex items-center justify-center gap-4">
              <h2>Loading Submit Form</h2>
              <LoaderCircleIcon className="animate-spin" />
            </div>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
