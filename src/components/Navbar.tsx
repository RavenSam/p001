"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Store } from "lucide-react";

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -24, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }
        );

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`fixed opacity-0 top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl rounded-full px-3 flex items-center justify-between z-50 transition-all duration-500 ${isScrolled ? "glass-panel backdrop-blur-sm shadow-2xl px-10" : "bg-transparent border border-transparent"
                }`}
        >
            <div className="flex items-center gap-2">
                <Link href="/" className="shrink-0 flex items-center">
                    <Image
                        src="/images/logo.png"
                        alt="MSDI Logo"
                        width={80}
                        height={80}
                        className="object-contain h-auto w-8 transition-transform duration-300"
                        priority
                    />

                    <span className="text-2xl font-bold text-obsidian/90 ml-3 hidden sm:block">MSDI</span>
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-obsidian/70">
                <Link href="#collections" className="hover:text-rubis transition-colors duration-300">Collections</Link>
                <Link href="#philosophie" className="hover:text-rubis transition-colors duration-300">Philosophie</Link>
                <Link href="#savoir-faire" className="hover:text-rubis transition-colors duration-300">Savoir-Faire</Link>
            </div>

            <div className="flex items-center">
                <Link
                    href="#boutique"
                    className="flex items-center gap-2 bg-rubis text-white px-5 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-white/20 backdrop-blur-sm hover:text-rubis border border-rubis transition-colors duration-300 group"
                >
                    <Store className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden sm:inline">Trouver notre boutique</span>
                    <span className="sm:hidden">Boutique</span>
                </Link>
            </div>
        </nav>
    );
}
