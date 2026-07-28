import { Check, X, AlertTriangle } from "lucide-react";

const variants = {
  success: "bg-green-500/10 text-green-400 border-green-500/20",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const icons = { success: Check, error: X, warning: AlertTriangle };

const StatusBadge = ({ label, variant = "success" }) => {
  const Icon = icons[variant];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${variants[variant]}`}
    >
      <Icon size={12} />
      {label}
    </span>
  );
};

export default StatusBadge;
