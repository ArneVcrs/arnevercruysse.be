"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/music", label: "Music" },
    { href: "/photos", label: "Photos" },
    { href: "/links", label: "Links" },
    { href: "/contact", label: "Contact" }
] as const;

export default function NavMenu() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const currentRoute = usePathname();

    const toggleMenu = () => setIsNavOpen(prev => !prev);
    const closeMenu = () => setIsNavOpen(false);

    return (
        <>
            <button
                onClick={toggleMenu}
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-accent text-background rounded-md transition-all duration-200 hover:scale-105"
            >
                {isNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div
                className={`md:hidden fixed inset-0 bg-background/5 backdrop-blur-xs z-40 transition-opacity duration-200 ${
                    isNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={closeMenu}
            />
            <nav
                className={`p-2 w-40 h-screen fixed top-0 left-0 z-50 bg-background transition-all duration-200 ease-in-out
                            ${
                                isNavOpen
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-full opacity-0 md:translate-x-0 md:opacity-100"
                            }`}
            >
                <Link href="/" className="flex justify-center">
                    <Image
                        src="/AV-logo.png"
                        title="AV Logo"
                        alt="AV Logo"
                        width={70}
                        height={70}
                        className="my-3"
                    />
                </Link>
                <ul className="w-full flex flex-col items-center">
                    {navItems.map((item) => {
                        const isActive = currentRoute === item.href;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={closeMenu}
                                    className={`text-center font-medium block w-30 px-1 rounded-md mb-2 transition-colors duration-200 ${
                                        isActive
                                            ? "bg-accent text-background hover:bg-accent"
                                            : "hover:bg-accent-muted hover:text-background"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
