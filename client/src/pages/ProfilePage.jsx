import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import Avatar from "../components/Avatar.jsx";

const ProfilePage = () => {
  const { user } = useAuth();

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const rows = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    {
      label: "Member Since",
      value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—",
    },
    { label: "Role", value: "User" },
    { label: "Authentication Type", value: "Email & Password" },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 pb-16">
      <div className="rounded-xl border border-surface-border bg-surface-light/60 p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar name={user?.name} size={64} />
          <div>
            <h1 className="text-xl font-semibold text-text-primary">{user?.name}</h1>
            <p className="text-sm text-text-secondary">{user?.email}</p>
          </div>
        </div>

        <div className="divide-y divide-surface-border border-t border-surface-border">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-3">
              <span className="text-sm text-text-secondary">{row.label}</span>
              <span className="text-sm text-text-primary">{row.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-text-secondary">Account ID</span>
            <button
              onClick={() => handleCopy(user?.id, "Account ID")}
              className="flex items-center gap-1.5 text-sm text-text-primary hover:text-accent transition-colors"
            >
              <span className="font-mono text-xs">{user?.id?.slice(0, 10)}…</span>
              <Copy size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
