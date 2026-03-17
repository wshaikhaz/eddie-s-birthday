import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Wish {
  id: number;
  name: string;
  message: string;
}

const initialWishes: Wish[] = [
  {
    id: 1,
    name: "Arleen",
    message:
      "Happy birthday Eddie! For 10 years and more, you’ve always been there—listening, understanding, and never judging. Thank you for being my constant and my safe place. 💛"
  },
  {
    id: 2,
    name: "Rhenee",
    message:
      "Happy birthday! Ang dami na nating tawanan at hangouts na hindi ko makakalimutan. I’m so grateful for all the fun moments we share—here’s to many more!"
  },
  {
    id: 3,
    name: "Obaid",
    message:
      "Happy birthday, my love. You are my home, my peace, and my greatest blessing. Thank you for filling my life with love, laughter, and meaning. I’m so lucky to have you. 💛"
  },
  {
    id: 4,
    name: "Mama",
    message:
      "Happy birthday, Eddle. Sobrang saya ko na napunta ka sa pamilya namin. Mahal na mahal ka namin."
  },
  {
    id: 5,
    name: "Mani",
    message:
      "Happy birthday! Sa lahat ng late-night inuman at movie nights natin, ikaw talaga yung kasama na hindi nakakasawa. Cheers to more kwentuhan, tawanan, at good times! 🍻"
  },
  {
    id: 6,
    name: "Keka",
    message: "Happy birthday to the best sister in law anyone could ask for!"
  }
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
    setWishes((prev) => [
      { id: Date.now(), name: name.trim(), message: message.trim() },
      ...prev
    ]);
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
          <p className="font-cursive text-gold text-lg mb-2">From Us to You</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Birthday Wishes
          </h2>
        </motion.div>

        {/* Form */}
        {/* <motion.form
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
        </motion.form> */}

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
              <p className="font-sans text-foreground/80 leading-relaxed mb-3">
                "{wish.message}"
              </p>
              <p className="font-cursive text-gold text-sm">— {wish.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishWall;
