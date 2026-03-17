import { useState } from "react";
import EnvelopeScene from "@/components/EnvelopeScene";
import HeroSection from "@/components/HeroSection";
import MessageSection from "@/components/MessageSection";
import GallerySection from "@/components/GallerySection";
import WishWall from "@/components/WishWall";
import Footer from "@/components/Footer";

const Index = () => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      {!envelopeOpen && (
        <EnvelopeScene onComplete={() => setEnvelopeOpen(true)} />
      )}
      {envelopeOpen && (
        <>
          <HeroSection />
          <MessageSection />
          <GallerySection />
          <WishWall />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
