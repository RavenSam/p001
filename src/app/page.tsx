import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ColorSelector from "@/components/ColorSelector";
import Philosophy from "@/components/Philosophy";
import Protocol from "@/components/Protocol";
import StoreLocator from "@/components/StoreLocator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-ivory text-obsidian selection:bg-rubis selection:text-ivory relative overflow-hidden">
      <Navbar />
      <Hero />
      <div className="relative z-10 bg-ivory border-t border-obsidian/5 rounded-t-[3rem] -mt-10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <Features />
      </div>
      <ColorSelector />
      <Philosophy />
      <Protocol />
      <StoreLocator />
      <Footer />
    </main>
  );
}
