"use client";

import useUser from "@/hooks/useUser";
import axios from "@/services/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast } from "sonner";
import Cookies from "universal-cookie";

export default function UserButton() {
    const [open, setOpen] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    const cookies = new Cookies(null, { path: "/" });

    const handleLogout = async () => {
        try {
            await axios.delete("/user/logout");
            cookies.remove("user");
            toast.success("Logged out successfully!");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
            toast.error("Logout failed, try again!");
        }
    };

    return (
        <div className="relative">
            {/* Avatar */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-[#ffcd33] focus:outline-none"
            >
                <Image
                    width={400}
                    height={400}
                    src={
                        user?.photo
                            ? user?.photo
                            : "https://api.dicebear.com/9.x/glass/svg?seed=Wyatt"
                    }
                    alt={user?.name || "user name"}
                    className="w-full h-full object-cover"
                    unoptimized
                />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                        {user?.name}
                    </div>
                    <button
                        onClick={() => router.push("/profile")}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        <FaUser className="mr-2" /> Dashboard
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                </div>
            )}
        </div>
    );
}
