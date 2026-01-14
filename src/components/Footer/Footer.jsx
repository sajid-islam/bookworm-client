import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-custom-accent text-gray-900 py-10 mt-10 md:mt-20">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. About / Logo */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Bookworm</h2>
                    <p className="text-gray-800 text-sm">
                        Empowering learners with books, tutorials, and knowledge everywhere.
                    </p>
                </div>

                {/* 2. Links */}
                <div>
                    <h3 className="font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-800 text-sm">
                        <li>
                            <Link href="/" className="hover:text-gray-900 transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/books" className="hover:text-gray-900 transition">
                                Books
                            </Link>
                        </li>
                        <li>
                            <Link href="/tutorials" className="hover:text-gray-900 transition">
                                Tutorials
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-gray-900 transition">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* 3. Socials */}
                <div>
                    <h3 className="font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            <FaFacebook className="w-5 h-5" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            <FaTwitter className="w-5 h-5" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            <FaInstagram className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                        >
                            <FaLinkedinIn className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom copyright */}
            <div className="mt-10 border-t border-gray-900 pt-6 text-center text-gray-900 text-sm">
                &copy; {new Date().getFullYear()} Bookworm. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
