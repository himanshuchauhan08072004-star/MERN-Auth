import { motion } from "framer-motion";

const colorMap = {
  accent: "bg-accent/10 text-accent",
  green: "bg-green-500/10 text-green-400",
  amber: "bg-amber-500/10 text-amber-400",
  blue: "bg-blue-500/10 text-blue-400",
};

const StatCard = ({ icon: Icon, label, value, sublabel, color = "accent", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="rounded-xl border border-surface-border bg-surface-light/60 backdrop-blur-sm p-4 hover:border-accent/30 transition-colors"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs text-text-secondary">{label}</span>
      <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
        <Icon size={14} />
      </div>
    </div>
    <p className="text-lg font-semibold text-text-primary">{value}</p>
    {sublabel && <p className="text-xs text-text-secondary mt-0.5">{sublabel}</p>}
  </motion.div>
);

export default StatCard;
