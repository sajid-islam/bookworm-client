"use client";
import axios from "@/services/axiosInstance";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const useUser = () => {
    const cookies = new Cookies(null, { path: "/" });

    const userCookie = cookies.get("user");
    const [user, setUser] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setIsUserLoading(true);
            try {
                if (userCookie) {
                    const userCookie = await cookies.get("user");
                    setIsUserLoading(false);
                    setUser(userCookie);
                } else {
                    const res = await axios.get("/user/me");
                    setIsUserLoading(false);
                    setUser(res.data.user);
                    cookies.set("user", res.data.user);
                }
            } catch (error) {
                setIsUserLoading(false);
                console.error(error);
            }
        };
        fetchUser();
    }, [axios]);

    return { user, isUserLoading };
};

export default useUser;
