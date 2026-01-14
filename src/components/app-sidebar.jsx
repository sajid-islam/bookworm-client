"use client";

import { LuBookOpen, LuLayoutDashboard } from "react-icons/lu";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import OrganizationInfo from "@/components/organization-info";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import useRole from "@/hooks/useRole";

export function AppSidebar({ ...props }) {
    const { isAdmin, isUser } = useRole();

    const data = {
        organization: {
            name: "DIPLOMA 360",
            logo: "/icon.png",
            plan: isAdmin ? "Admin" : "User",
        },
    };
    const navMain = [
        // Admin
        isAdmin && {
            title: "Dashboard",
            url: "/dashboard",
            icon: LuLayoutDashboard,
            isActive: true,
            items: [
                { title: "Overview", url: "/dashboard" },
                { title: "Manage Books", url: "/dashboard/books" },
                { title: "Manage Genres", url: "/dashboard/genres" },
                { title: "Manage Users", url: "/dashboard/users" },
                { title: "Moderate Reviews", url: "/dashboard/reviews" },
                { title: "Manage Tutorials", url: "/dashboard/tutorials" },
            ],
        },

        // User
        isUser && {
            title: "My Library",
            url: "/my-library",
            icon: LuBookOpen,
            isActive: true,
            items: [
                { title: "All Books", url: "/my-library" },
                { title: "Reading List", url: "/my-library/reading-list" },
                { title: "Favorites", url: "/my-library/favorites" },
            ],
        },
    ].filter(Boolean);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <OrganizationInfo organization={data.organization} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
