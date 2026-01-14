"use client";

import axios from "@/services/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

const ManageGenres = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editOpen, setEditOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [name, setName] = useState("");

    /* ================= FETCH ================= */
    const fetchGenres = async () => {
        try {
            const res = await axios.get("/genre");
            setGenres(res.data.genres);
        } catch {
            toast.error("Failed to load genres");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    /* ================= EDIT ================= */
    const openEdit = (genre) => {
        setSelectedGenre(genre);
        setName(genre.name);
        setEditOpen(true);
    };

    const handleUpdate = async () => {
        if (!name.trim()) {
            toast.error("Genre name is required");
            return;
        }

        try {
            await axios.put(`/genre/${selectedGenre._id}`, {
                name,
            });
            toast.success("Genre updated successfully");
            setEditOpen(false);
            fetchGenres();
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!genres.length) {
        return <div className="text-center py-10 text-gray-500">No genres found.</div>;
    }

    return (
        <div className="px-4 py-6">
            <DashboardHeader page={"Manage Genres"} />

            <div className="overflow-x-auto max-w-2xl mx-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="w-32">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {genres.map((genre) => (
                            <TableRow key={genre._id}>
                                <TableCell className="font-medium">{genre.name}</TableCell>
                                <TableCell>
                                    <Button size="sm" onClick={() => openEdit(genre)}>
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* ================= EDIT DIALOG ================= */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Genre</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Input
                            placeholder="Genre name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Button className="w-full" onClick={handleUpdate}>
                            Update Genre
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageGenres;
