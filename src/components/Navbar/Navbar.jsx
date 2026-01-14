"use client";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { Button } from "../ui/button";
import UserButton from "../UserButton/UserButton";
import NavbarToggleBtn from "./NavbarToggleBtn";
import NavLinks from "./NavLinks";

const Navbar = () => {
    const { user } = useUser();
    return (
        <div className="px-5 h-16 flex items-center justify-between">
            <div>
                <Link href={"/"} className="text-2xl font-semibold">
                    Bookworm
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <NavLinks />
                <div>
                    {user ? (
                        <UserButton />
                    ) : (
                        <>
                            {" "}
                            <div className="flex items-center gap-1">
                                <Button size="sm">
                                    {" "}
                                    <Link href="/login">login</Link>
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-transparent hover:bg-transparent text-black border-2 border-black px-2 py-1 text-sm hidden md:block "
                                >
                                    <Link href="/register">Register</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <NavbarToggleBtn />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
