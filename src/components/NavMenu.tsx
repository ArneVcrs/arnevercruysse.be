'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" }
]

export default function NavMenu() {
    const currentRoute = usePathname();

    return (
        <nav>
            <ul>
                {navItems.map((item) => {
                    const isActive = currentRoute === item.href;

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
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