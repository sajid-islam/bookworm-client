"use client";

import axios from "@/services/axiosInstance";
import { BookOpenIcon, FileVideoCameraIcon, List, StarIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";

export default function Dashboard() {
    const [stats, setStats] = useState({
        books: 0,
        users: 0,
        reviews: 0,
        genres: 0,
        tutorials: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("/stats");
                setStats(res.data.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Books",
            value: stats.books,
            icon: <BookOpenIcon className="h-6 w-6 text-white" />,
            color: "bg-blue-500",
        },
        {
            title: "Users",
            value: stats.users,
            icon: <UserIcon className="h-6 w-6 text-white" />,
            color: "bg-green-500",
        },
        {
            title: "Reviews",
            value: stats.reviews,
            icon: <StarIcon className="h-6 w-6 text-white" />,
            color: "bg-yellow-500",
        },
        {
            title: "Genres",
            value: stats.genres,
            icon: <List className="h-6 w-6 text-white" />,
            color: "bg-purple-500",
        },
        {
            title: "Tutorials",
            value: stats.tutorials,
            icon: <FileVideoCameraIcon className="h-6 w-6 text-white" />,
            color: "bg-red-500",
        },
    ];

    return (
        <div className="px-4 py-6">
            <DashboardHeader page={"Dashboard"} />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="animate-pulse h-24 bg-gray-200 rounded-lg" />
                      ))
                    : statCards.map((card) => (
                          <div
                              key={card.title}
                              className="flex items-center p-4 rounded-lg border shadow hover:shadow-lg transition duration-200 bg-white"
                          >
                              <div
                                  className={`p-3 rounded-full ${card.color} flex items-center justify-center`}
                              >
                                  {card.icon}
                              </div>
                              <div className="ml-4">
                                  <p className="text-gray-500 text-sm">{card.title}</p>
                                  <p className="text-2xl font-bold">{card.value}</p>
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
}
