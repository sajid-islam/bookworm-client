import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

function MainLayout({ children }) {
    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}

export default MainLayout;
