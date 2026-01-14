"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/services/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const email = e.target.elements.email.value;
            const password = e.target.elements.password.value;
            await axios.post("/user/login", { email, password });
            e.target.reset();
            router.push("/");
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Sign In</h2>

                {/* Email / Password Login */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter Your password"
                            className="mt-1"
                        />
                    </div>

                    {/* Login Button*/}
                    <Button disabled={loading} type="submit" className="w-full mt-4">
                        {loading ? "loading.." : "Login"}
                    </Button>
                </form>

                <p className="mt-4 text-sm text-gray-600 text-center">
                    No Account?{" "}
                    <Link href={`/register`} className="text-custom-primary font-semibold">
                        register
                    </Link>
                </p>
            </div>
        </div>
    );
}
