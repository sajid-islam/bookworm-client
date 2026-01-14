"use client";

import axios from "@/services/axiosInstance";
import { useEffect, useState } from "react";

const ReviewsList = ({ bookId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`/review/book/${bookId}`);
            setReviews(res.data.reviews);
        } catch (err) {
            console.error("Error fetching reviews", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [bookId]);

    if (loading) return;
    if (!reviews.length) return;

    return (
        <div className="mt-10 space-y-2">
            <h1 className="text-2xl font-medium">Reviews</h1>
            {reviews.map((r) => (
                <div key={r._id} className="p-2 border rounded bg-gray-50">
                    <p className="text-sm font-medium">{r.user.name}</p>
                    <p className="text-sm text-yellow-600">⭐ {r.rating}/5</p>
                    <p className="text-sm text-gray-700">{r.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewsList;
