const Footer = () => (
  <footer className="py-16 px-6 text-center border-t border-border">
    <p className="font-cursive text-gold text-xl mb-2">Eddie</p>
    <p className="font-sans text-muted-foreground text-sm">
      March 18, 2026 — Happy Birthday❤️
    </p>
    <div className="flex justify-center gap-2 mt-4">
      {["🎂", "🥳", "🎉"].map((e, i) => (
        <span key={i} className="text-lg">
          {e}
        </span>
      ))}
    </div>
  </footer>
);

export default Footer;
