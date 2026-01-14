import { Button } from "@/components/ui/button";
import Link from "next/link";

const MyLibrary = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100svh-80px)] bg-gray-50 px-4 text-center">
            {/* Illustration / Icon */}
            <div className="mb-6">
                <svg
                    className="w-24 h-24 text-gray-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m2-4h.01M12 12h.01M5 7h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                    />
                </svg>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                My Library – Under Construction
            </h1>

            {/* Subtext */}
            <p className="text-gray-600 mb-6 max-w-md">
                Don’t worry! We’re building the most powerful user features for your library. Stay
                tuned, it will be worth the wait.
            </p>

            {/* Button / Call to action */}
            <Link href="/">
                <Button>Go Back Home</Button>
            </Link>
        </div>
    );
};

export default MyLibrary;
