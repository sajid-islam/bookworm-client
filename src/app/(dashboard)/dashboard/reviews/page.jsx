"use client";

import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "@/services/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState("");

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/review/all");
            setReviews(res.data.reviews);
        } catch (err) {
            console.error("Error fetching reviews:", err);
            toast.error("Failed to fetch reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        setUpdating(id);
        try {
            await axios.patch(`/review/${id}`, { status: newStatus });
            toast.success(`Review ${newStatus}`);
            fetchReviews();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update review");
        } finally {
            setUpdating("");
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!reviews.length) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500">
                No reviews found.
            </div>
        );
    }

    return (
        <div className="px-4 py-6">
            <DashboardHeader page={"Manage Reviews"} />

            <div className="overflow-x-auto">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Book</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {reviews.map((r) => (
                            <TableRow key={r._id}>
                                <TableCell>{r.user.name}</TableCell>
                                <TableCell>{r.user.email}</TableCell>
                                <TableCell>{r.book.title}</TableCell>
                                <TableCell>⭐ {r.rating}/5</TableCell>
                                <TableCell className="max-w-xs truncate">{r.comment}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${
                                            r.status === "approved"
                                                ? "bg-green-100 text-green-800"
                                                : r.status === "rejected"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {r.status}
                                    </span>
                                </TableCell>
                                <TableCell>{new Date(r.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="flex gap-2">
                                    {r.status !== "approved" && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={updating === r._id}
                                            onClick={() => handleStatusChange(r._id, "approved")}
                                        >
                                            Approve
                                        </Button>
                                    )}
                                    {r.status !== "rejected" && (
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            disabled={updating === r._id}
                                            onClick={() => handleStatusChange(r._id, "rejected")}
                                        >
                                            Reject
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ManageReviews;
