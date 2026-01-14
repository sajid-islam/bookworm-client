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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import Loader from "@/components/Loader/Loader";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

const ManageTutorials = () => {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedTutorial, setSelectedTutorial] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        youtubeUrl: "",
        isActive: true,
    });

    /* ================= FETCH ================= */
    const fetchTutorials = async () => {
        try {
            const res = await axios.get("/tutorial/admin/all");
            setTutorials(res.data.tutorials);
        } catch {
            toast.error("Failed to load tutorials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTutorials();
    }, []);

    /* ================= EDIT ================= */
    const openEdit = (tutorial) => {
        setSelectedTutorial(tutorial);
        setForm({
            title: tutorial.title,
            description: tutorial.description,
            youtubeUrl: tutorial.youtubeUrl,
            isActive: tutorial.isActive,
        });
        setEditOpen(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/tutorial/${selectedTutorial._id}`, form);
            toast.success("Tutorial updated");
            setEditOpen(false);
            fetchTutorials();
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        }
    };

    /* ================= DELETE ================= */
    const openDelete = (tutorial) => {
        setSelectedTutorial(tutorial);
        setDeleteOpen(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/tutorial/${selectedTutorial._id}`);
            toast.success("Tutorial deleted");
            setDeleteOpen(false);
            fetchTutorials();
        } catch {
            toast.error("Delete failed");
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!tutorials.length) {
        return <div className="text-center py-10 text-gray-500">No tutorials found.</div>;
    }

    return (
        <div className="px-4 py-6">
            <DashboardHeader page={"Mange Tutorials"} />
            <div className="w-full flex justify-end mb-5">
                <Link href={"/dashboard/add-video"}>
                    <Button className="flex items-center gap-2">
                        <PlayCircle className="h-4 w-4" />
                        Add Tutorial
                    </Button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-40">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tutorials.map((tutorial) => (
                            <TableRow key={tutorial._id}>
                                <TableCell className="font-medium">{tutorial.title}</TableCell>
                                <TableCell>
                                    {tutorial.isActive ? (
                                        <span className="text-green-600">Active</span>
                                    ) : (
                                        <span className="text-gray-400">Inactive</span>
                                    )}
                                </TableCell>
                                <TableCell className="flex gap-2">
                                    <Button size="sm" onClick={() => openEdit(tutorial)}>
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => openDelete(tutorial)}
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
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edit Tutorial</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Input
                            placeholder="Title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />

                        <Input
                            placeholder="YouTube URL"
                            value={form.youtubeUrl}
                            onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                        />

                        <textarea
                            className="w-full rounded-md border p-2 text-sm"
                            rows={4}
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />

                        <div className="flex items-center gap-3">
                            <Switch
                                checked={form.isActive}
                                onCheckedChange={(v) => setForm({ ...form, isActive: v })}
                            />
                            <span>Active</span>
                        </div>

                        <Button className="w-full" onClick={handleUpdate}>
                            Update Tutorial
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ================= DELETE CONFIRM ================= */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Tutorial?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={handleDelete}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ManageTutorials;
