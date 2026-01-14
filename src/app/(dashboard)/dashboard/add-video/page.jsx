"use client";

import { SpinLoader } from "@/components/Loader/SpinLoader";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/services/axiosInstance";
import { useState } from "react";
import { toast } from "sonner";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
const AddVideo = () => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        youtubeUrl: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim() || !form.youtubeUrl.trim()) {
            toast.error("Title and YouTube URL are required");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("/tutorial", form);
            toast.success("Tutorial added successfully");
            setForm({ title: "", description: "", youtubeUrl: "" });
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DashboardHeader page="Add Tutorial Video" />

            <div className="container mx-auto px-4 mt-5">
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video Title
                            </label>
                            <Input
                                name="title"
                                placeholder="Enter video title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                YouTube URL
                            </label>
                            <Input
                                name="youtubeUrl"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={form.youtubeUrl}
                                onChange={handleChange}
                                required
                                className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description (optional)
                            </label>
                            <Textarea
                                name="description"
                                placeholder="Add a short description..."
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? <SpinLoader /> : "Add Tutorial"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </div>
        </>
    );
};

export default AddVideo;
