"use client";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RootLoader from "../Loader/RootLoader";

export default function ProtectRoute({ children, allowedRole }) {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading) {
            if (!user || user.role !== allowedRole) {
                router.replace("/");
            }
        }
    }, [user, isUserLoading, router, allowedRole]);

    if (isUserLoading || !user || user.role !== allowedRole) {
        return <RootLoader />;
    }

    return <>{children}</>;
}
