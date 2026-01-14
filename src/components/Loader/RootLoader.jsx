const RootLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="relative">
                <div className="relative w-32 h-32">
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

export default RootLoader;
