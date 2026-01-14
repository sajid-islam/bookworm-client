"use client";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/icon.png";
import { Button } from "../ui/button";
import UserButton from "../UserButton/UserButton";
import NavbarToggleBtn from "./NavbarToggleBtn";
import NavLinks from "./NavLinks";

const Navbar = () => {
    const { user } = useUser();
    return (
        <div className="px-5 h-16 flex items-center justify-between">
            <Link href={"/"} className="flex items-center gap-2">
                <Image width={40} height={40} alt="logo" src={logo} />
                <h1 className="text-2xl font-semibold">Bookworm</h1>
            </Link>
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
