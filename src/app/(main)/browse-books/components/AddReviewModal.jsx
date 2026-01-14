"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import axios from "@/services/axiosInstance";
import { useState } from "react";
import { toast } from "sonner";

const AddReviewModal = ({ bookId }) => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!rating || !comment.trim()) {
            toast.error("Please provide rating and comment");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`/review/${bookId}`, { rating, comment });
            toast.success("Review submitted and waiting for approval");
            setOpen(false);
            setRating(5);
            setComment("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to submit review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                variant="outline"
                size="lg"
                className="bg-amber-400 hover:bg-amber-500"
                onClick={() => setOpen(true)}
            >
                Add Review
            </Button>

            <DialogContent className="sm:max-w-100">
                <DialogHeader>
                    <DialogTitle>Add Review</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div>
                        <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                        <input
                            type="number"
                            min={1}
                            max={5}
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Submit Review"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddReviewModal;
