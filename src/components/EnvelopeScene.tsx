import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "./Envelope";
import { playOpenSound } from "@/lib/sounds";

interface EnvelopeSceneProps {
  onComplete: () => void;
}

const audio = new Audio("/song.mp3");

const EnvelopeScene = ({ onComplete }: EnvelopeSceneProps) => {
  const [phase, setPhase] = useState<"sealed" | "opening" | "letter" | "done">(
    "sealed"
  );

  const handleClick = () => {
    if (phase !== "sealed") return;
    audio.play();
    setPhase("opening");
    setTimeout(() => setPhase("letter"), 800);
  };

  const handleContinue = () => {
    setPhase("done");
    setTimeout(onComplete, 600);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-paper"
          style={{
            backgroundImage: "url('/paper-texture.png')",
            backgroundSize: "400px",
            backgroundBlendMode: "overlay"
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Envelope phase */}
          <AnimatePresence>
            {(phase === "sealed" || phase === "opening") && (
              <motion.div
                className="flex flex-col items-center gap-6"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Envelope isOpen={phase === "opening"} onClick={handleClick} />
                {phase === "sealed" && (
                  <motion.p
                    className="font-sans text-muted-foreground text-sm tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Click to open your surprise ✉️
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Letter phase */}
          <AnimatePresence>
            {phase === "letter" && (
              <motion.div
                className="absolute inset-4 sm:inset-8 md:inset-16 lg:inset-24 flex items-center justify-center"
                initial={{ y: 100, opacity: 0, scale: 0.85 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div
                  className="relative w-full max-w-lg mx-auto rounded-lg p-8 sm:p-12 shadow-envelope bg-cream"
                  style={{
                    backgroundImage: "url('/paper-texture.png')",
                    backgroundSize: "400px",
                    backgroundBlendMode: "overlay"
                  }}
                >
                  {/* Gold border accent */}
                  <div className="absolute inset-0 rounded-lg border-2 border-gold/20 pointer-events-none" />

                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <p className="font-cursive text-gold text-lg mb-2">
                        A Special Letter
                      </p>
                      <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
                        Happy Birthday, Eddie! 🎂
                      </h2>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="space-y-4"
                    >
                      <p className="font-sans text-muted-foreground leading-relaxed">
                        Ngayong araw ay para sa’yo — isang araw para i-celebrate
                        lahat ng masasayang alaala, tawanan, mga pinagdaanan, at
                        kung gaano ka ka-special na tao.
                      </p>
                      <p className="font-sans text-muted-foreground leading-relaxed">
                        May inihanda kami para sa’yo na galing sa puso. Scroll
                        mo lang para makita mo yung mga memories, messages, at
                        pagmamahal mula sa lahat ng nagmamahal sa’yo. 💛
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                    >
                      <button
                        onClick={handleContinue}
                        className="mt-4 font-sans text-sm tracking-wide text-gold border-b-2 border-gold/40 hover:border-gold pb-1 transition-colors duration-300"
                      >
                        Continue to the Surprise →
                      </button>
                    </motion.div>
                  </div>

                  {/* Decorative corners */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/20 rounded-tl" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/20 rounded-tr" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/20 rounded-bl" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/20 rounded-br" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeScene;
