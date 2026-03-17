import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeProps {
  isOpen: boolean;
  onClick: () => void;
}

const WaxSeal = () => (
  <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[38%]">
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse-gentle"
      style={{
        background: "radial-gradient(circle at 35% 35%, hsl(0 72% 45%), hsl(0 72% 35%) 50%, hsl(0 72% 25%))",
        boxShadow: "0 4px 12px rgba(120, 20, 20, 0.4), inset 0 -2px 4px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.1)",
      }}
    >
      <span className="font-display text-cream text-xl font-bold select-none" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>E</span>
    </div>
  </div>
);

const Envelope = ({ isOpen, onClick }: EnvelopeProps) => {
  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{ width: 320, height: 220, perspective: 800 }}
      onClick={!isOpen ? onClick : undefined}
      whileHover={!isOpen ? { scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Envelope back */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: "linear-gradient(135deg, hsl(30 40% 92%), hsl(30 35% 86%))",
          boxShadow: "var(--shadow-envelope)",
        }}
      />

      {/* Envelope inner shadow */}
      <div
        className="absolute inset-2 rounded-lg"
        style={{
          background: "linear-gradient(180deg, hsl(30 30% 88%) 0%, hsl(30 35% 92%) 100%)",
        }}
      />

      {/* Letter peek (visible inside) */}
      <div
        className="absolute left-4 right-4 top-6 bottom-4 rounded-md bg-cream"
        style={{
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
          backgroundImage: "url('/paper-texture.png')",
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="p-4 pt-5">
          <div className="w-3/4 h-1 bg-foreground/5 rounded mb-2" />
          <div className="w-1/2 h-1 bg-foreground/5 rounded mb-2" />
          <div className="w-2/3 h-1 bg-foreground/5 rounded" />
        </div>
      </div>

      {/* Envelope bottom flap */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-xl"
        style={{
          background: "linear-gradient(180deg, hsl(30 35% 90%), hsl(30 30% 85%))",
          clipPath: "polygon(0 30%, 50% 0%, 100% 30%, 100% 100%, 0 100%)",
          boxShadow: "0 -1px 3px rgba(0,0,0,0.03)",
        }}
      />

      {/* Address text on envelope */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center z-10">
        <p className="font-cursive text-foreground/60 text-lg">To Eddie</p>
      </div>

      {/* Envelope top flap */}
      <motion.div
        className="absolute inset-x-0 top-0 z-10"
        style={{
          height: "55%",
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
        }}
        animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0 rounded-t-xl"
          style={{
            background: "linear-gradient(180deg, hsl(30 30% 87%), hsl(30 35% 90%))",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            backfaceVisibility: "hidden",
          }}
        />
        <div
          className="absolute inset-0 rounded-t-xl"
          style={{
            background: "linear-gradient(180deg, hsl(30 35% 84%), hsl(30 30% 80%))",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        />
      </motion.div>

      {/* Wax seal */}
      {!isOpen && <WaxSeal />}
    </motion.div>
  );
};

export default Envelope;
