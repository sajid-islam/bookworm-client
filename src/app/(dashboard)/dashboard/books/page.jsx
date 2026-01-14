"use client";

import axios from "@/services/axiosInstance";
import Image from "next/image";
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

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import Loader from "@/components/Loader/Loader";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedBook, setSelectedBook] = useState(null);
    const [form, setForm] = useState({});

    /* ================= FETCH ================= */
    const fetchBooks = async () => {
        try {
            const res = await axios.get("/book");
            setBooks(res.data.books);
        } catch {
            toast.error("Failed to load books");
        } finally {
            setLoading(false);
        }
    };

    const fetchGenres = async () => {
        const res = await axios.get("/genre");
        setGenres(res.data.genres);
    };

    useEffect(() => {
        fetchBooks();
        fetchGenres();
    }, []);

    /* ================= EDIT ================= */
    const openEdit = (book) => {
        setSelectedBook(book);
        setForm({
            title: book.title,
            author: book.author,
            genre: book.genre?._id,
            description: book.description,
            coverFile: "",
        });
        setEditOpen(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/book/${selectedBook._id}`, form);
            toast.success("Book updated");
            setEditOpen(false);
            fetchBooks();
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        }
    };

    /* ================= DELETE ================= */
    const handleDelete = async () => {
        try {
            await axios.delete(`/book/${selectedBook._id}`);
            toast.success("Book deleted");
            setDeleteOpen(false);
            fetchBooks();
        } catch {
            toast.error("Delete failed");
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="px-4 py-6">
            <DashboardHeader page={"Manage Books"} />

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cover</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Genre</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book._id}>
                                <TableCell>
                                    <Image
                                        src={book.coverImage}
                                        width={40}
                                        height={60}
                                        alt={book.title}
                                        className="rounded"
                                    />
                                </TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.genre?.name}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button size="sm" onClick={() => openEdit(book)}>
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            setSelectedBook(book);
                                            setDeleteOpen(true);
                                        }}
                                    >
                                        Delete
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
                        <DialogTitle>Edit Book</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Input
                            placeholder="Title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                        <Input
                            placeholder="Author"
                            value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                        />

                        <Select
                            value={form.genre}
                            onValueChange={(v) => setForm({ ...form, genre: v })}
                        >
                            <SelectTrigger>
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

                        <Textarea
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onloadend = () =>
                                    setForm({ ...form, coverFile: reader.result });
                                reader.readAsDataURL(file);
                            }}
                        />

                        <Button onClick={handleUpdate} className="w-full">
                            Update Book
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ================= DELETE CONFIRM ================= */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {selectedBook?.title}?</AlertDialogTitle>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Yes, Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ManageBooks;
