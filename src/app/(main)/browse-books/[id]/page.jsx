"use client";

import { Button } from "@/components/ui/button";
import axios from "@/services/axiosInstance";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";

const BookDetail = () => {
    const { id } = useParams();
    const router = useRouter();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`/book/${id}`);
                setBook(res.data.book);
            } catch (err) {
                console.error("Error fetching book:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-600 mb-4"></div>
                    <p className="text-lg text-gray-600">Loading book details...</p>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Book not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Book Cover */}
                    <div className="lg:w-2/5 w-full flex items-center justify-center">
                        <div className="relative group">
                            <Image
                                src={book?.coverImage}
                                alt={book?.title}
                                width={400}
                                height={600}
                                className="w-full h-auto object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Right: Book Info */}
                    <div className="lg:w-3/5 w-full">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {book?.title}
                            </h1>

                            <div className="space-y-3 mb-6">
                                <p className="text-xl text-gray-700">
                                    <span className="font-semibold text-gray-900">Author:</span>{" "}
                                    <span className="text-gray-700">{book?.author}</span>
                                </p>
                                <p className="text-lg text-gray-600">
                                    <span className="font-semibold text-gray-900">Genre:</span>{" "}
                                    <span className="text-gray-600">
                                        Genre information (to be populated)
                                    </span>
                                </p>
                            </div>

                            <div className="prose prose-lg text-gray-600 mb-8">
                                <p className="leading-relaxed">{book?.description}</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="default"
                                size="lg"
                                className="flex-1"
                                onClick={() => alert(`Added "${book?.title}" to Want to Read`)}
                            >
                                <Plus />
                                Want to Read
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="flex-1"
                                onClick={() => router.back()}
                            >
                                <FaBackward />
                                Back to Browse
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
