"use client";

import { Button } from "@/components/ui/button"; // Assuming you’re using shadcn/ui
import axios from "@/services/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BookSkeleton from "./components/books.skeleton";

const BrowseBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get("/book");
                setBooks(res.data.books);
            } catch (err) {
                console.error("Error fetching books:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <BookSkeleton />;
    }

    if (!books.length) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500">
                No books found.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div
                        key={book._id}
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    >
                        <Image
                            width={400}
                            height={400}
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-56 object-cover rounded-t-lg"
                        />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">{book.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    <span className="font-medium">Author:</span> {book.author}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    <span className="font-medium">Genre:</span> {book.genre?.name}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => toast(`Added "${book.title}" to Want to Read`)}
                                    className="flex-1"
                                >
                                    Want to Read
                                </Button>
                                <Link href={`/books/${book._id}`} className="flex-1">
                                    <Button size="sm" className="w-full">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseBooks;
