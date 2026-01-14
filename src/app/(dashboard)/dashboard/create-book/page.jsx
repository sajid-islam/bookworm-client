"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/services/axiosInstance";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

import { SpinLoader } from "@/components/Loader/SpinLoader";
import Image from "next/image";
import { toast } from "sonner"; // Make sure sonner is installed

export default function CreateBookForm() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [coverPreview, setCoverPreview] = useState(null);

    const [form, setForm] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        coverFile: "",
    });

    // Fetch genres
    useEffect(() => {
        axios.get("/genre").then((res) => setGenres(res.data.genres));
    }, []);

    // Handle text input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle image upload → base64
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm({ ...form, coverFile: reader.result });
            setCoverPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Frontend validation
        if (!form.title || !form.author || !form.genre || !form.description || !form.coverFile) {
            toast.error("Please fill all fields before submitting");
            setLoading(false);
            return;
        }

        try {
            await axios.post("/book", form);
            toast.success("Book created successfully");
            setForm({
                title: "",
                author: "",
                genre: "",
                description: "",
                coverFile: "",
            });
            setCoverPreview(null);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DashboardHeader page="Create Book" />

            <div className="container mx-auto px-4 mt-5">
                <div className="">
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Book Title
                                        </label>
                                        <Input
                                            name="title"
                                            placeholder="Enter book title"
                                            value={form.title}
                                            onChange={handleChange}
                                            className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Author Name
                                        </label>
                                        <Input
                                            name="author"
                                            placeholder="Enter author name"
                                            value={form.author}
                                            onChange={handleChange}
                                            className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Genre
                                        </label>
                                        <Select
                                            value={form.genre}
                                            onValueChange={(value) =>
                                                setForm({ ...form, genre: value })
                                            }
                                            required
                                        >
                                            <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <SelectValue placeholder="Select genre" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {genres.map((g) => (
                                                    <SelectItem key={g._id} value={g._id}>
                                                        {g.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Book Description
                                        </label>
                                        <Textarea
                                            name="description"
                                            placeholder="Enter a short description..."
                                            rows={4}
                                            value={form.description}
                                            onChange={handleChange}
                                            className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Book Cover
                                    </label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImage}
                                        className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {coverPreview && (
                                    <div className="flex items-center space-x-4">
                                        <div className="shrink-0">
                                            <Image
                                                width={128}
                                                height={176}
                                                src={coverPreview}
                                                alt="Cover preview"
                                                className="w-32 h-44 object-cover rounded-lg shadow-md border border-gray-200"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600">
                                                Cover uploaded successfully
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <SpinLoader />
                                            Creating...
                                        </span>
                                    ) : (
                                        "Create Book"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </div>
            </div>
        </>
    );
}
