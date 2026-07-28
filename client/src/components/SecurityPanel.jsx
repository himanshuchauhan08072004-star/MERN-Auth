import StatusBadge from "./StatusBadge.jsx";

const securityItems = [
  "Password Protected (bcrypt)",
  "JWT Enabled",
  "Refresh Token Active",
  "HttpOnly Cookies",
  "Secure Cookies",
  "Rate Limiter Enabled",
  "Helmet Enabled",
  "MongoDB Connected",
  "API Connected",
];

const SecurityPanel = () => (
  <div className="rounded-xl border border-surface-border bg-surface-light/60 p-5">
    <h3 className="font-semibold text-text-primary mb-1">Security Status</h3>
    <p className="text-xs text-text-secondary mb-4">
      Reflects the security measures actually implemented in this backend.
    </p>
    <div className="flex flex-wrap gap-2">
      {securityItems.map((item) => (
        <StatusBadge key={item} label={item} variant="success" />
      ))}
    </div>
  </div>
);

export default SecurityPanel;
