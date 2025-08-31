'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    
]

export default function NavMenu() {
    const currentRoute = usePathname();

    return (
        <nav className="p-2 w-40 h-screen fixed top-0 left-0">
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
            <ul className="w-full">
                {navItems.map((item) => {
                    const isActive = currentRoute === item.href;

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`font-medium block w-35 px-1 ${
                                    isActive ?
                                "bg-accent text-background hover:bg-accent" : "hover:bg-accent-muted hover:text-background"}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}