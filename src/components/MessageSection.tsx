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
          backgroundBlendMode: "overlay",
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="font-cursive text-gold text-lg mb-4">A Message From Us</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-8">
          Dear Eddie,
        </h2>
        
        <div className="space-y-5 font-sans text-muted-foreground leading-relaxed">
          <p>
            It's hard to put into words how much you mean to all of us. From the moment you walk into a room, 
            you bring this incredible energy — a warmth that makes everyone feel at home.
          </p>
          <p>
            This year has been filled with so many amazing moments together: the spontaneous road trips, 
            the late-night conversations, the belly laughs over the silliest things. 
            Each memory is a treasure, and we're so grateful to share them with you.
          </p>
          <p>
            As you step into this new year of your life, know that you are surrounded by people who love you deeply, 
            believe in you completely, and will always be in your corner.
          </p>
          <p className="font-display text-foreground text-lg italic">
            Here's to you, Eddie — to another year of chasing dreams, making memories, and being the incredible 
            person you are. 🥂
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="font-cursive text-gold text-lg">With all our love,</p>
          <p className="font-sans text-muted-foreground mt-1">Your Friends & Family ❤️</p>
        </div>
      </motion.div>
    </section>
  );
};

export default MessageSection;
