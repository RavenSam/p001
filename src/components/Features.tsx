"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Globe, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const fullText = "Une formulation précise avec les meilleurs ingrédients mondiaux.";
const words = ["L'Élégance", "La Pureté", "L'Excellence", "La Beauté"];

export default function Features() {
    const containerRef = useRef<HTMLDivElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);

    // Typewriter effect state
    const [typedText, setTypedText] = useState("");

    // Shuffler effect state
    const [shuffleWord, setShuffleWord] = useState(words[0]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered reveal for cards on scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(
                [card1Ref.current, card2Ref.current, card3Ref.current],
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.95,
                    filter: "blur(6px)"
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.7,
                    stagger: 0.5,
                    ease: "power4.out"
                }
            );

            // Card 1 Shuffler
            let shuffleIdx = 0;
            const shufflerInterval = setInterval(() => {
                gsap.to(".shuffle-text", {
                    opacity: 0, y: -10, duration: 0.2, onComplete: () => {
                        shuffleIdx = (shuffleIdx + 1) % words.length;
                        setShuffleWord(words[shuffleIdx]);
                        gsap.fromTo(".shuffle-text", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 });
                    }
                });
            }, 2500);

            // Card 2 Typewriter
            let i = 0;
            let timeout: NodeJS.Timeout;

            const type = () => {
                if (i < fullText.length) {
                    setTypedText(fullText.slice(0, i + 1));
                    i++;
                    timeout = setTimeout(type, 50);
                } else {
                    // Pause AFTER finishing typing
                    timeout = setTimeout(() => {
                        i = 0;
                        setTypedText("");
                        type(); // restart typing
                    }, 1500); // <-- pause duration (1.5s)
                }
            };

            type();

            return () => {
                clearInterval(shufflerInterval);
                clearTimeout(timeout);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="collections" ref={containerRef} className="py-32 px-6 relative z-10 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1: Fierté Algérienne / Shuffler */}
                <div ref={card1Ref} className="glass-panel p-8 rounded-3xl flex flex-col justify-between h-[400px] group hover:bg-white/40 transition-colors duration-500 shadow-sm border border-black/5">
                    <Globe className="w-8 h-8 text-rubis mb-12 opacity-80" />
                    <div>
                        <h3 className="text-2xl font-serif text-obsidian mb-4 flex items-center gap-2 overflow-hidden h-8">
                            <span className="shuffle-text inline-block">{shuffleWord}</span>
                        </h3>
                        <h4 className="font-medium tracking-widest uppercase text-xs text-rubis mb-2">Made in Algeria</h4>
                        <p className="text-sm text-obsidian/70 leading-relaxed font-light">
                            La première marque cosmétique algérienne à concurrencer l'excellence mondiale, avec une fierté ancrée dans notre patrimoine.
                        </p>
                    </div>
                </div>

                {/* Card 2: Savoir-faire d'Exception / Typewriter */}
                <div ref={card2Ref} className="glass-panel p-8 rounded-3xl flex flex-col justify-between h-[400px] group hover:bg-white/40 transition-colors duration-500 shadow-sm border border-black/5">
                    <Sparkles className="w-8 h-8 text-rubis mb-12 opacity-80" />
                    <div>
                        <h3 className="text-2xl font-serif text-obsidian mb-4 underline decoration-rubis underline-offset-4 decoration-1">
                            Savoir-faire d'Exception
                        </h3>
                        <p className="text-sm text-obsidian/70 leading-relaxed font-light min-h-[4rem]">
                            {typedText}<span className="animate-pulse bg-rubis w-[2px] h-4 inline-block ml-1 align-middle"></span>
                        </p>
                    </div>
                </div>

                {/* Card 3: Innovation & Accessibilité / Minimal Interface */}
                <div ref={card3Ref} className="glass-panel p-8 rounded-3xl flex flex-col justify-between h-[400px] overflow-hidden group hover:bg-white/40 transition-colors duration-500 relative shadow-sm border border-black/5">
                    <ShieldCheck className="w-8 h-8 text-rubis mb-12 opacity-80 z-10" />
                    <div className="z-10">
                        <h3 className="text-2xl font-serif text-obsidian mb-4">Innovation & Accessibilité</h3>
                        <p className="text-sm text-obsidian/70 leading-relaxed font-light">
                            Des produits haut de gamme conçus pour révéler la beauté unique de chaque femme, à un prix pensé pour l'accessibilité.
                        </p>
                    </div>
                    {/* Subtle glow hover effect */}
                    <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-rubis/10 rounded-full blur-3xl group-hover:bg-rubis/20 transition-all duration-700" />
                </div>

            </div>
        </section>
    );
}
