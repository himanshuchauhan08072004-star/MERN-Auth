import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext.jsx";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative h-9 w-9 flex items-center justify-center rounded-lg border border-surface-border bg-surface-light hover:bg-surface-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? (
          <Sun size={17} className="text-text-secondary" />
        ) : (
          <Moon size={17} className="text-text-secondary" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
