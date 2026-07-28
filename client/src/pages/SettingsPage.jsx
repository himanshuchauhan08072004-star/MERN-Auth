import { useState } from "react";
import toast from "react-hot-toast";
import { User, Lock, Shield, Palette, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import SecurityPanel from "../components/SecurityPanel.jsx";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "password", label: "Password", icon: Lock },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const Toggle = ({ checked, onChange, label }) => (
  <div className="flex items-center justify-between py-2.5">
    <span className="text-sm text-text-primary">{label}</span>
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`w-10 h-6 rounded-full relative transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        checked ? "bg-accent" : "bg-surface-border"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-4.5" : "translate-x-0.5"
        }`}
        style={{ transform: checked ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  </div>
);

const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState(user?.name || "");
  const [notifications, setNotifications] = useState({ email: true, security: true, marketing: false });

  const notPersisted = () =>
    toast("This demo doesn't wire profile/password edits to the backend yet.", { icon: "ℹ️" });

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 pb-16">
      <h1 className="text-xl font-semibold text-text-primary mb-6">Settings</h1>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg border transition-colors whitespace-nowrap ${
              activeTab === id
                ? "border-accent bg-accent/10 text-accent"
                : "border-surface-border text-text-secondary hover:bg-surface-light"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-surface-border bg-surface-light/60 p-6">
        {activeTab === "profile" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-surface border border-surface-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">Email</label>
              <input
                value={user?.email || ""}
                disabled
                className="w-full px-3 py-2 rounded-md bg-surface border border-surface-border text-text-secondary opacity-60"
              />
            </div>
            <button
              onClick={notPersisted}
              className="px-4 py-2 rounded-md bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}

        {activeTab === "password" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">Current Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-md bg-surface border border-surface-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-md bg-surface border border-surface-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              onClick={notPersisted}
              className="px-4 py-2 rounded-md bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
            >
              Update Password
            </button>
          </div>
        )}

        {activeTab === "security" && <SecurityPanel />}

        {activeTab === "appearance" && (
          <div>
            <p className="text-sm text-text-secondary mb-4">Choose how MERNAuth looks on this device.</p>
            <div className="flex gap-3">
              {["dark", "light"].map((t) => (
                <button
                  key={t}
                  onClick={() => theme !== t && toggleTheme()}
                  className={`flex-1 py-3 rounded-lg border text-sm capitalize transition-colors ${
                    theme === t
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-surface-border text-text-secondary hover:bg-surface"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="divide-y divide-surface-border">
            <Toggle
              label="Email notifications"
              checked={notifications.email}
              onChange={() => setNotifications((n) => ({ ...n, email: !n.email }))}
            />
            <Toggle
              label="Security alerts"
              checked={notifications.security}
              onChange={() => setNotifications((n) => ({ ...n, security: !n.security }))}
            />
            <Toggle
              label="Product updates"
              checked={notifications.marketing}
              onChange={() => setNotifications((n) => ({ ...n, marketing: !n.marketing }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
