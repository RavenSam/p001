import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-ivory text-obsidian py-16 px-6 border-t border-black/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

                <div className="flex flex-col items-center md:items-start">
                    <Image
                        src="/images/logo transparent bg.png"
                        alt="MSDI Logo"
                        width={120}
                        height={48}
                        className="object-contain w-auto h-10 md:h-12 mb-4 opacity-90"
                    />
                    <p className="text-sm font-light text-obsidian/60 max-w-xs text-center md:text-left">
                        L'Excellence Made in Algeria. Redéfinir les standards de la cosmétique avec précision et passion.
                    </p>
                </div>

                <div className="flex gap-12 text-sm text-obsidian/70 font-light">
                    <div className="flex flex-col gap-3">
                        <span className="text-obsidian font-medium uppercase tracking-widest text-xs mb-2">Explorer</span>
                        <a href="#collections" className="hover:text-rubis transition-colors">Collections</a>
                        <a href="#philosophie" className="hover:text-rubis transition-colors">Philosophie</a>
                        <a href="#savoir-faire" className="hover:text-rubis transition-colors">Savoir-Faire</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-obsidian font-medium uppercase tracking-widest text-xs mb-2">Légal</span>
                        <a href="#" className="hover:text-rubis transition-colors">Mentions Légales</a>
                        <a href="#" className="hover:text-rubis transition-colors">Politique de Confidentialité</a>
                        <a href="#" className="hover:text-rubis transition-colors">CGV</a>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center text-xs text-obsidian/50 font-light">
                <p>&copy; {new Date().getFullYear()} MSDI Product Algérie. Tous droits réservés.</p>
                <p className="mt-2 md:mt-0 flex items-center gap-1">
                    Designed with <span className="text-rubis">♥</span> in Algeria.
                </p>
            </div>
        </footer>
    );
}
