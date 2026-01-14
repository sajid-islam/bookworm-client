"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "@/services/axiosInstance";
import { useState } from "react";
import { toast } from "sonner";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

export default function CreateGenreForm() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter a genre name");
            return;
        }

        setLoading(true);

        try {
            await axios.post("/genre", { name: name.trim() });
            toast.success("Genre created successfully");
            setName("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DashboardHeader page="Create Genre" />

            <div className="container mx-auto px-4 mt-5 max-w-md">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Add New Genre</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Genre Name
                                </label>
                                <Input
                                    placeholder="Enter genre name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating..." : "Create Genre"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
