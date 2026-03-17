import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

const memories = [
  { src: memory1, caption: "Summer at the beach — pure joy", span: "col-span-2" },
  { src: memory2, caption: "That unforgettable dinner night", span: "row-span-2" },
  { src: memory3, caption: "Adventures on the mountain trail", span: "" },
  { src: memory4, caption: "Game nights that never get old", span: "" },
  { src: memory5, caption: "New Year's we'll never forget", span: "row-span-2" },
  { src: memory6, caption: "Rooftop evenings with the crew", span: "col-span-2" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-cursive text-gold text-lg mb-2">Memories</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Moments We Treasure
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {memories.map((mem, i) => (
            <motion.div
              key={i}
              className={`group relative overflow-hidden rounded-lg ${mem.span}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, rotate: 0.5 }}
            >
              <img
                src={mem.src}
                alt={mem.caption}
                className="w-full h-full object-cover aspect-square"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="font-sans text-sm text-primary-foreground">{mem.caption}</p>
              </div>
              <div className="absolute inset-0 border border-foreground/5 rounded-lg pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
