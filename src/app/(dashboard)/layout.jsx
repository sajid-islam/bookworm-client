import { AppSidebar } from "@/components/app-sidebar";
import ProtectRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }) => {
    return (
        <ProtectRoute allowedRole={"admin"}>
            <SidebarProvider>
                {" "}
                <AppSidebar />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>{" "}
        </ProtectRoute>
    );
};

export default DashboardLayout;
