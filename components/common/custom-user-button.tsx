"use client";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Building2Icon, BuildingIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export const CustomUserButton = () => {
  const router = useRouter();
  const { closeUserProfile } = useClerk();
  return (
    <UserButton>
      <UserButton.UserProfilePage
        label="Organizations"
        labelIcon={<BuildingIcon className="size-4" />}
        url="organizations"
      >
        <div className="p-4">
          <h2>Manage Organization</h2>
          <OrganizationSwitcher
            hidePersonal={true}
            afterCreateOrganizationUrl={"/submit"}
            afterSelectPersonalUrl={"/submit"}
            appearance={{
              elements: {
                rootBox: "w-full",
              },
            }}
          />
        </div>
      </UserButton.UserProfilePage>
      <UserButton.UserProfilePage
        label="Admin"
        labelIcon={<Building2Icon className="size-4" />}
        url="admin"
      >
        <div className="p-4">
          <h2>Admin Panel</h2>
          <Button
            size="default"
            className="w-full"
            onClick={() => {
              closeUserProfile();
              router.push("/admin");
            }}
          >
            Go to Admin Panel
          </Button>
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  );
};
