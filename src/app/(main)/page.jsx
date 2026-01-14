"use client";

import RootLoader from "@/components/Loader/RootLoader";
import useRole from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const router = useRouter();
    const { isAdmin, isRoleLoading } = useRole();

    useEffect(() => {
        if (isRoleLoading) return;

        router.replace(isAdmin ? "/dashboard" : "/browse-books");
    }, [isAdmin, isRoleLoading, router]);

    return <RootLoader />;
};

export default Page;
