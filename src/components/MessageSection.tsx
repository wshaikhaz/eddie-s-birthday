import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const MessageSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6" ref={ref}>
      <motion.div
        className="max-w-2xl mx-auto rounded-xl p-8 sm:p-12 shadow-card bg-card border border-border"
        style={{
          backgroundImage: "url('/paper-texture.png')",
          backgroundSize: "400px",
          backgroundBlendMode: "overlay"
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="font-cursive text-gold text-lg mb-4">
          A Message From Keka
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-8">
          Dear Eddie,
        </h2>

        <div className="space-y-5 font-sans text-muted-foreground leading-relaxed">
          <p>
            Ang hirap ilagay sa salita kung gaano ka kahalaga sa amin. Sa tuwing
            dumarating ka, may dala kang kakaibang saya at warmth — yung tipong
            napaparamdam mo sa lahat na parang nasa bahay lang sila.
          </p>
          <p>
            Ang daming magagandang moments nitong taon: yung mga biglaang lakad,
            kwentuhan hanggang gabi, at tawanan kahit sa pinaka simpleng bagay.
            Lahat ng alaala na ‘yon, sobrang special, at sobrang thankful kami
            na nakakasama ka namin sa mga ‘yon.
          </p>
          <p>
            Sa pagpasok mo sa panibagong taon ng buhay mo, tandaan mo na
            napapaligiran ka ng mga taong mahal ka, naniniwala sa’yo, at laging
            nandito para sa’yo kahit ano pa mangyari.
          </p>
          <p className="font-display text-foreground text-lg italic">
            Para sa’yo, Eddie — sa mas marami pang pangarap na matutupad, alaala
            na mabubuo, at sa patuloy mong pagiging kahanga-hangang tao. 🥂
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="font-cursive text-gold text-lg">Mahal ka namin,</p>
          <p className="font-sans text-muted-foreground mt-1">
            Mula sa iyong pamilya at mga kaibigan ❤️
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default MessageSection;
