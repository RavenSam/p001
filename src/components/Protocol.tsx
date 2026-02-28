"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        step: "01",
        title: "La Sélection",
        description: "Nous sourçons les ingrédients les plus purs et les plus performants à travers le monde, garantissant une base saine et respectueuse pour chaque flacon.",
    },
    {
        step: "02",
        title: "La Formulation",
        description: "Dans nos laboratoires en Algérie, nos experts formulent des textures innovantes assurant une pigmentation intense, un séchage rapide et une longue tenue.",
    },
    {
        step: "03",
        title: "La Perfection",
        description: "Chaque produit MSDI est soumis à des contrôles qualité rigoureux avant de rejoindre nos points de vente, pour offrir une expérience beauté sans compromis.",
    }
];

export default function Protocol() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".protocol-card");

            cards.forEach((card, index) => {
                gsap.to(card, {
                    y: -40 * (cards.length - index),
                    opacity: 0.8,
                    scale: 0.95,
                    scrollTrigger: {
                        trigger: card,
                        start: "top center",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="savoir-faire" ref={containerRef} className="py-24 px-6 relative w-full bg-ivory text-obsidian">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-serif text-center mb-24 text-obsidian">
                    L'Archive <span className="italic text-rubis">MSDI</span>
                </h2>

                <div className="w-full relative space-y-32 md:space-y-48 pb-32">
                    {protocols.map((protocol, i) => (
                        <div
                            key={i}
                            className="protocol-card sticky top-32 glass-panel p-10 md:p-16 rounded-3xl w-full border border-black/5 shadow-sm bg-white/40 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 will-change-transform"
                            style={{ zIndex: i + 10 }}
                        >
                            <div className="text-7xl md:text-9xl font-sans font-light text-obsidian/10 w-32 shrink-0">
                                {protocol.step}
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-4xl gap-4 font-serif text-rubis mb-4">
                                    {protocol.title}
                                </h3>
                                <p className="text-obsidian/70 leading-relaxed font-light md:text-lg">
                                    {protocol.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
