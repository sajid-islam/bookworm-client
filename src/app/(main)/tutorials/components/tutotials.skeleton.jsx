const TutorialsSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse flex flex-col"
                    >
                        {/* Video placeholder */}
                        <div className="h-56 bg-gray-200 w-full"></div>

                        {/* Text placeholders */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                                {/* Title */}
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                {/* Description */}
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorialsSkeleton;
