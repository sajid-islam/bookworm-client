import { AppSidebar } from "@/components/app-sidebar";
import ProtectRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }) => {
    return (
            <SidebarProvider>
                {" "}
                <AppSidebar />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>{" "}
    );
};

export default DashboardLayout;
