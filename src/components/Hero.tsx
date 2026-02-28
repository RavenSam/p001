"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
                headlineRef.current,
                { x: -80, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.4, ease: "power4.out" }
            )
                .fromTo(
                    subRef.current,
                    { x: -120, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
                    "-=1.1"
                )
                .fromTo(
                    ctaRef.current,
                    { x: -160, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
                    "-=1.1"
                )
                .fromTo(
                    ".hero-image-col",
                    { opacity: 0, x: 40, filter: "blur(10px)" },
                    { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.8, ease: "power3.out" },
                    "-=1.5"
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-24"
        >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply flex items-center justify-end">
                <Image src="/images/ruby_texture.png" alt="" width={1000} height={1000} className="object-cover h-full w-auto max-w-none" priority />
            </div>

            <div className="max-w-7xl mx-auto w-full z-10 relative">

                {/* Text Column */}
                <div className="flex md:pl-16 flex-col items-center md:items-start text-center md:text-left space-y-8 md:max-w-xl lg:max-w-3xl relative z-20">
                    <h1
                        ref={headlineRef}
                        className="flex flex-col gap-2 perspective-1000"
                    >
                        <span className="hero-line block text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-obsidian/90">
                            L'excellence absolue
                        </span>
                        <span className="hero-line block text-5xl sm:text-6xl md:text-8xl lg:text-8xl xl:text-[7.5rem] font-serif italic text-rubis drop-shadow-sm mt-2 leading-[0.9] sm:whitespace-nowrap">
                            Savoir-Faire.
                        </span>
                    </h1>

                    <p
                        ref={subRef}
                        className="max-w-md md:max-w-xl text-lg md:text-xl text-obsidian/90 font-medium tracking-wide leading-relaxed"
                    >
                        La première marque de cosmétique et de soins des ongles 100% Algérienne.<br />
                        L'alliance parfaite entre l'artisanat d'exception, l'innovation et l'élégance moderne.
                    </p>

                    <div ref={ctaRef} className="pt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start md:items-center gap-6 w-full">
                        <a href="#collections" className="group flex items-center justify-center gap-3 bg-obsidian text-ivory px-6 py-4 md:px-8 md:py-5 rounded-full font-medium tracking-widest uppercase text-[10px] md:text-xs hover:bg-rubis hover:text-ivory transition-all duration-500 overflow-hidden relative shadow-xl shadow-obsidian/10 w-full sm:w-auto text-center">
                            <span className="relative z-10 flex items-center gap-2">
                                Découvrir nos collections
                                <ArrowDownRight className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform duration-500" />
                            </span>
                        </a>
                        <a href="#boutique" className="text-xs md:text-sm font-bold tracking-widest uppercase text-obsidian/90 hover:text-rubis transition-colors duration-300 underline-offset-8 decoration-1 hover:underline sm:ml-2">
                            Trouver notre boutique
                        </a>
                    </div>
                </div>

            </div>

            {/* Editorial Image Background (Right Side, Full Height, Faded Edge) */}
            <div className="hero-image-col absolute inset-0 md:inset-y-0 md:left-auto md:right-0 w-full md:w-[60%] z-0 pointer-events-none overflow-hidden">

                {/* Image */}
                <Image
                    src="/images/hero_bottle.jpeg"
                    alt="Premium MSDI Nail Polish Bottle"
                    fill
                    className="object-cover object-center md:ml-20"
                    priority
                />

                {/* Fade Overlay (Desktop) */}
                <div className="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-ivory via-ivory/80 to-transparent" />

                {/* Optional subtle depth */}
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm md:hidden" />

            </div>
        </section>
    );
}
