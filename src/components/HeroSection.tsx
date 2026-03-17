import { motion } from "framer-motion";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
    {/* Decorative gradient orbs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-wax-red/5 blur-3xl" />

    <div className="relative text-center max-w-3xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-cursive text-gold text-xl mb-4">March 18, 2025</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight text-balance leading-tight">
          Happy Birthday, Eddie! 🎂
        </h1>
      </motion.div>

      <motion.p
        className="font-sans text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto text-balance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        A day to celebrate a lifetime of incredible moments, 
        unforgettable adventures, and the wonderful soul that you are.
      </motion.p>

      <motion.div
        className="flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {["🎉", "🥂", "🎁", "✨", "🎈"].map((emoji, i) => (
          <span key={i} className="text-2xl">{emoji}</span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
