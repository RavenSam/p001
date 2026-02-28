"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Check } from "lucide-react";

const colorGroups = [
    {
        group: "N°301-330",
        colors: ["#1a1819", "#10100e", "#1e1d1f", "#575a66", "#e7e7e5", "#dbdbdb", "#e6bebc", "#ffc6ba", "#fdb7b9"]
    },
    {
        group: "N°331-360",
        colors: ["#c87d64", "#9b5843", "#96513c", "#714133", "#984d4e", "#9d6665", "#854444", "#983e41", "#7f393d", "#391d1f", "#911c19", "#7b1b19", "#611a17", "#70201c", "#3a110d", "#2c0d0b", "#160e0c", "#941613", "#6d1b12", "#7e1e16", "#e2302b", "#a72420", "#952523", "#a31b1f", "#bb3842", "#ba3b47", "#ab252f", "#c92621", "#6c1b12"]
    },
    {
        group: "N°361-390",
        colors: ["#ad2019", "#9c1e17", "#871512", "#ac211c", "#a41f1a", "#7b2c27", "#bc241d", "#d65f41", "#cf3e2d", "#ad2f24", "#761d15", "#621d16", "#8c3327", "#f88783", "#ee6158", "#f4655d", "#ff737b", "#cf4744", "#f64441", "#0438b3", "#03197f", "#0c1138", "#a6b1e5", "#2f95c0", "#69a0b1", "#3f6b7b", "#7fa4ba"]
    },
    {
        group: "N°85-107 & N°391-394",
        colors: ["#59727f", "#3f505f", "#ea9183", "#e93f46"]
    }
];

function getContrast(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
}

export default function ColorSelector() {
    const defaultColor = colorGroups[1].colors[20]; // #e2302b (beautiful red)
    const [selectedColor, setSelectedColor] = useState(defaultColor);
    const [activeGroupIndex, setActiveGroupIndex] = useState(1);
    const contrastColor = getContrast(selectedColor);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [isImageReady, setIsImageReady] = useState(false);

    // Ensure the image loads locally
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "/images/hand_neon_nails.png";
        img.onload = () => {
            imgRef.current = img;
            setIsImageReady(true);
        };
    }, []);

    // Perform the chroma-key color replacement on the green nails
    useEffect(() => {
        if (!isImageReady || !canvasRef.current || !imgRef.current) return;

        const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const img = imgRef.current;
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // Set canvas dimensions strictly to image actual size preserving hi-res
        if (canvasRef.current.width !== width) {
            canvasRef.current.width = width;
            canvasRef.current.height = height;
        }

        // Draw original
        ctx.drawImage(img, 0, 0, width, height);

        const hex = selectedColor.replace('#', '');
        const tr = parseInt(hex.substring(0, 2), 16);
        const tg = parseInt(hex.substring(2, 4), 16);
        const tb = parseInt(hex.substring(4, 6), 16);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Convert RGB to HSL for better chroma keying
        const rgbToHsl = (r: number, g: number, b: number) => {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h = 0, s, l = (max + min) / 2;
            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return [h, s, l];
        };

        // Process pixels to replace the neon green (chroma mask)
        // ── Chroma-key pass ──────────────────────────────────────────────────────────
        // ── Chroma-key + spill-suppression pass ──────────────────────────────────────
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const [h, s, l] = rgbToHsl(r, g, b);

            // ── Zone 1: Core chroma key (saturated greens) ───────────────────────────
            const isGreenHue = h > 0.10 && h < 0.60;
            const hasSaturation = s > 0.08;
            const notTooDark = l > 0.04;
            const isChromaKey = isGreenHue && hasSaturation && notTooDark;

            // ── Zone 2: Spill pixels (edge mixing, low saturation) ───────────────────
            // Catches desaturated olive/yellow-green pixels at nail borders
            const greenDominance = g - Math.max(r, b);
            const isEdgeSpill = !isChromaKey && greenDominance > 8 && l > 0.06 && l < 0.92;

            if (!isChromaKey && !isEdgeSpill) continue;

            // ── Compute blend alpha ──────────────────────────────────────────────────
            let alpha = 1.0;

            if (isChromaKey) {
                if (h < 0.22) alpha = Math.min(1, (h - 0.10) / 0.12);
                else if (h > 0.50) alpha = Math.min(1, (0.60 - h) / 0.10);
                if (s < 0.25) alpha *= Math.min(1, (s - 0.08) / 0.17);
            } else {
                // Proportional to how green-dominant the pixel is
                alpha = Math.min(0.92, (greenDominance / 40));
            }

            alpha = Math.max(0, Math.min(1, alpha));
            if (alpha < 0.01) continue;

            // ── Spill neutralization BEFORE color replacement ────────────────────────
            // For edge spill pixels: first desaturate the green channel (classic technique)
            // Replace g with average of r and b — kills the green cast without killing luminance
            let workR = r, workG = g, workB = b;
            if (isEdgeSpill) {
                workG = (r + b) / 2; // Neutralize green spill
            }

            // ── Map luminance → target color ─────────────────────────────────────────
            const luminance = (0.299 * workR + 0.587 * workG + 0.114 * workB) / 255;

            let finalR = tr, finalG = tg, finalB = tb;

            if (luminance > 0.55) {
                const gloss = Math.min(1, (luminance - 0.55) * 2.2);
                finalR = Math.min(255, finalR + (255 - finalR) * gloss);
                finalG = Math.min(255, finalG + (255 - finalG) * gloss);
                finalB = Math.min(255, finalB + (255 - finalB) * gloss);
            } else {
                const shadowLuma = Math.min(1, luminance * 1.5 + 0.1);
                finalR *= shadowLuma;
                finalG *= shadowLuma;
                finalB *= shadowLuma;
            }

            // ── Composite: blend with spill-neutralized pixel (not raw pixel) ─────────
            data[i] = finalR * alpha + workR * (1 - alpha);
            data[i + 1] = finalG * alpha + workG * (1 - alpha);
            data[i + 2] = finalB * alpha + workB * (1 - alpha);
        }
        ctx.putImageData(imgData, 0, 0);

    }, [selectedColor, isImageReady]);

    return (
        <section id="teintes" className="relative w-full py-24 md:py-32 bg-ivory text-obsidian overflow-hidden border-t border-black/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                {/* Left: Realistic Hand Preview (Canvas) */}
                <div className="lg:col-span-5 order-2 lg:order-1 relative flex flex-col items-center">
                    <div className="w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-[#e3ded8] border border-black/5">
                        <div className="absolute top-6 left-6 z-20 glass-panel !bg-white/60 !backdrop-blur-xl px-4 py-2 rounded-full border border-white/40 shadow-xl flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full border border-black/10 transition-colors duration-500"
                                style={{ backgroundColor: selectedColor }}
                            />
                            <span className="text-obsidian font-bold tracking-widest uppercase text-[9px] md:text-[10px]">
                                {selectedColor}
                            </span>
                        </div>

                        {!isImageReady && (
                            <div className="absolute inset-0 flex items-center justify-center bg-ivory/50">
                                <div className="w-8 h-8 rounded-full border-2 border-rubis border-t-transparent animate-spin" />
                            </div>
                        )}

                        {/* Canvas acting as the final rendered image */}
                        <canvas
                            ref={canvasRef}
                            className={`w-full h-full object-cover transition-opacity duration-1000 ${isImageReady ? 'opacity-100' : 'opacity-0'}`}
                            style={{ filter: "contrast(1.05) saturate(1.1)" }}
                        />
                    </div>
                </div>

                {/* Right: Elegant Tabbed Color Palette UI */}
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
                    <div className="max-w-xl">
                        <span className="text-xs uppercase tracking-widest text-rubis font-bold mb-4 block">Notre Nuancier</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-obsidian mb-6 leading-tight">L'art de la couleur.</h2>
                        <p className="text-obsidian/90 font-medium leading-relaxed max-w-lg">
                            Sélectionnez une teinte ci-dessous pour l'essayer instantanément. Une couleur pure, éclatante, qui sublime chaque détail.
                        </p>
                    </div>

                    <div className="border border-black/10 rounded-3xl p-6 md:p-10 bg-white shadow-sm">
                        {/* Category Tabs */}
                        <div className="flex flex-wrap gap-2 md:gap-4 mb-10 pb-6 border-b border-black/5">
                            {colorGroups.map((group, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveGroupIndex(idx)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeGroupIndex === idx
                                        ? 'bg-obsidian text-ivory shadow-lg'
                                        : 'bg-transparent text-obsidian/40 hover:text-obsidian hover:bg-black/5'
                                        }`}
                                >
                                    {group.group}
                                </button>
                            ))}
                        </div>

                        {/* Active Color Grid */}
                        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3 md:gap-4 min-h-[200px] content-start">
                            {colorGroups[activeGroupIndex].colors.map((color, colorIdx) => (
                                <button
                                    key={`${activeGroupIndex}-${colorIdx}`}
                                    onClick={() => setSelectedColor(color)}
                                    className={`relative w-8 h-10 sm:w-10 sm:h-12 rounded-xl group transition-all duration-300 ${selectedColor === color ? 'scale-110 z-10 shadow-lg ring-2 ring-offset-2 ring-obsidian' : 'hover:scale-105 hover:shadow-md'
                                        }`}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Teinte ${color}`}
                                    title={color}
                                >
                                    {selectedColor === color && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <Check size={14} style={{ color: contrastColor }} strokeWidth={3} />
                                        </div>
                                    )}
                                    {/* Subtle gloss effect on the button itself */}
                                    <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl pointer-events-none" />
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
