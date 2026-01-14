import Navbar from "@/components/Navbar/Navbar";

function MainLayout({ children }) {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
}

export default MainLayout;
