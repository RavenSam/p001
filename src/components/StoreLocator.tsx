"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function StoreLocator() {
    return (
        <section id="boutique" className="relative w-full py-32 px-6 bg-ivory border-t border-black/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-16">

                {/* Contact Panel */}
                <div className="flex-1 space-y-8 flex flex-col justify-center">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-rubis font-bold mb-4 block">Notre Adresse</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-obsidian mb-6">Venez découvrir et tester nos produits en boutique.</h2>
                        <p className="text-obsidian/90 leading-relaxed max-w-md font-light">
                            L'expérience MSDI se vit aussi en vrai. Retrouvez l'intégralité de nos collections, nos éditions limitées et bénéficiez des conseils experts de notre équipe.
                        </p>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-black/10">
                        <div className="flex items-center gap-4 text-obsidian">
                            <MapPin className="text-rubis w-5 h-5 shrink-0" />
                            <address className="not-italic text-sm font-medium">
                                Aéroport international d'Alger<br />
                                Alger, Algérie
                            </address>
                        </div>

                        <div className="flex items-center gap-4 text-obsidian">
                            <Phone className="text-rubis w-5 h-5 shrink-0" />
                            <p className="text-sm font-medium">+213 555 12 34 56</p>
                        </div>

                        <div className="flex items-center gap-4 text-obsidian">
                            <Mail className="text-rubis w-5 h-5 shrink-0" />
                            <p className="text-sm font-medium">contact@msdi-algerie.com</p>
                        </div>

                        <div className="flex items-center gap-4 text-obsidian">
                            <Clock className="text-rubis w-5 h-5 shrink-0" />
                            <p className="text-sm font-medium">Lun - Sam : 09h00 - 19h00</p>
                        </div>
                    </div>
                </div>

                {/* Embedded Map Section */}
                <div className="flex-1 relative aspect-square md:aspect-auto md:min-h-[600px] overflow-hidden rounded-3xl group border border-black/10">
                    <div className="absolute inset-0 bg-ivory/40 z-10 pointer-events-none group-hover:bg-ivory/10 transition-colors duration-700" />
                    <iframe
                        title="Carte d'emplacement de la boutique MSDI"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102347.11899551406!2d2.9691851919934444!3d36.71457497262424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad67ee2138eb%3A0xeab49495167b5e8b!2sA%C3%A9roport%20International%20d&#39;Alger%20Houari%20Boumediene!5e0!3m2!1sfr!2sdz!4v1700000000000!5m2!1sfr!2sdz"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: "contrast(1.1) opacity(0.9)" }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    ></iframe>
                </div>

            </div>
        </section>
    );
}
