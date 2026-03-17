import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Wish {
  id: number;
  name: string;
  message: string;
}

const initialWishes: Wish[] = [
  { id: 1, name: "Sarah", message: "Happy birthday Eddie! You make every room brighter just by being in it. 🌟" },
  { id: 2, name: "Marcus", message: "Cheers to another year of amazing adventures together, buddy!" },
  { id: 3, name: "Lily", message: "Wishing you all the happiness your heart can hold. You deserve it all! 💛" },
  { id: 4, name: "James", message: "Remember that road trip last summer? Here's to a hundred more. Happy birthday!" },
  { id: 5, name: "Priya", message: "The world is a better place because you're in it. Celebrate big today! 🎉" },
  { id: 6, name: "Tom", message: "Happy birthday to the best friend anyone could ask for. Love you, man!" },
];

const WishWall = () => {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setWishes((prev) => [{ id: Date.now(), name: name.trim(), message: message.trim() }, ...prev]);
    setName("");
    setMessage("");
  };

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-cursive text-gold text-lg mb-2">Leave a Wish</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Birthday Wishes
          </h2>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 rounded-lg bg-card border border-border font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
          <textarea
            placeholder="Write your birthday wish..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full px-5 py-3 rounded-lg bg-card border border-border font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
          />
          <button
            type="submit"
            className="font-sans text-sm tracking-wide text-gold border-b-2 border-gold/40 hover:border-gold pb-1 transition-colors duration-300"
          >
            Send Your Wish ✨
          </button>
        </motion.form>

        {/* Wish cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishes.map((wish, i) => (
            <motion.div
              key={wish.id}
              className="p-6 rounded-xl shadow-card bg-card/80 backdrop-blur-sm border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * Math.min(i, 6), duration: 0.5 }}
              whileHover={{ scale: 1.02, rotate: 1 }}
            >
              <p className="font-sans text-foreground/80 leading-relaxed mb-3">"{wish.message}"</p>
              <p className="font-cursive text-gold text-sm">— {wish.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishWall;
