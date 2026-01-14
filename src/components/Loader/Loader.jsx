const Loader = () => {
    return (
        <div className="flex items-center justify-center bg-white min-h-screen">
            <div className="relative">
                <div className="relative w-24 h-24">
                    <div
                        className="absolute inset-0 rounded-full border-[3px] border-gray-100/10 border-r-cyan-400 border-b-cyan-400 animate-spin"
                        style={{ animationDuration: "3s" }}
                    />

                    <div
                        className="absolute inset-0 rounded-full border-[3px] border-gray-100/10 border-t-cyan-400 animate-spin"
                        style={{
                            animationDuration: "2s",
                            animationDirection: "reverse",
                        }}
                    />
                </div>

                <div className="absolute inset-0 rounded-full bg-linear-to-tr from-cyan-400/10 via-transparent to-cyan-400/5 animate-pulse blur-sm" />
            </div>
        </div>
    );
};

export default Loader;
