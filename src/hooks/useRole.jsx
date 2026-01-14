import axios from "@/services/axiosInstance";
import { useEffect, useState } from "react";

const useRole = () => {
    const [role, setRole] = useState("");
    const [isRoleLoading, setIsRoleLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const res = await axios.get("/user/me/role");
                setRole(res.data.role);
            } catch (error) {
                console.log(error);
            } finally {
                setIsRoleLoading(false);
            }
        };
        fetchUserRole();
    }, []);
    return { role, isAdmin: role === "admin", isUser: role === "user", isRoleLoading };
};

export default useRole;
