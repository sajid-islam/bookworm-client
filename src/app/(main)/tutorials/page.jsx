"use client";

import { CardContent } from "@/components/ui/card";
import axios from "@/services/axiosInstance";
import { useEffect, useState } from "react";
import TutorialsSkeleton from "./components/tutotials.skeleton";

const Tutorials = () => {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                const res = await axios.get("/tutorial");
                setTutorials(res.data.tutorials);
            } catch (err) {
                console.error("Error fetching tutorials:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTutorials();
    }, []);

    if (loading) {
        return <TutorialsSkeleton />;
    }

    if (!tutorials.length) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500">
                No tutorials found.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tutorials.map((tut) => {
                    // Extract YouTube video ID
                    const videoId = tut.youtubeUrl.split("v=")[1]?.split("&")[0];

                    return (
                        <CardContent
                            key={tut._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
                        >
                            {videoId ? (
                                <div className="relative pb-[56.25%] h-0 w-full">
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title={tut.title}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="h-56 bg-gray-200 flex items-center justify-center">
                                    Invalid Video URL
                                </div>
                            )}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <h2 className="text-lg font-semibold">{tut.title}</h2>
                                {tut.description && (
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                        {tut.description}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    );
                })}
            </div>
        </div>
    );
};

export default Tutorials;
