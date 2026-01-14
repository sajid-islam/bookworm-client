const BookSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse flex flex-col h-72"
                    >
                        {/* Cover image skeleton */}
                        <div className="h-56 bg-gray-200 w-full"></div>

                        {/* Text & buttons skeleton */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div className="space-y-2">
                                {/* Title */}
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                {/* Author */}
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                {/* Genre */}
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2 mt-2">
                                <div className="h-8 bg-gray-200 rounded flex-1"></div>
                                <div className="h-8 bg-gray-200 rounded flex-1"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookSkeleton;
