"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax text effect and color inversion illusion
            gsap.to(textRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                y: -100,
                ease: "none",
            });

            // Reveal text lines
            gsap.fromTo(
                ".manifesto-line",
                { opacity: 0, y: 50, rotationX: -15 },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="philosophie"
            ref={sectionRef}
            className="relative w-full py-48 bg-obsidian text-ivory overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center z-10 relative">
                <div ref={textRef} className="perspective-1000">
                    <p className="manifesto-line text-sm md:text-base font-medium tracking-widest uppercase text-ivory/60 mb-12">
                        Notre Manifeste
                    </p>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-8 max-w-4xl mx-auto leading-tight">
                        <span className="manifesto-line block">La beauté n'est pas un luxe,</span>
                        <span className="manifesto-line block text-rubis pt-2">c'est une signature.</span>
                    </h2>

                    <div className="manifesto-line max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-t border-ivory/10 pt-12">
                        <div>
                            <h4 className="font-bold mb-4 font-sans tracking-tight">Le Contraste 01</h4>
                            <p className="text-ivory/70 text-sm leading-relaxed">
                                Nous fusionnons l'exigence des plus grands laboratoires mondiaux avec l'authenticité de notre production locale algérienne.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 font-sans tracking-tight">Le Contraste 02</h4>
                            <p className="text-ivory/70 text-sm leading-relaxed">
                                Le vernis à ongles réinventé. Longue tenue, brillance miroir et formules respectueuses, pour les salons professionnels comme pour vous.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
