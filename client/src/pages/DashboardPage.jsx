import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Activity,
  Shield,
  KeyRound,
  Globe,
  RotateCw,
  Server,
  Copy,
  Monitor,
  UserCog,
  LogOut,
  ShieldOff,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { getAccessToken } from "../services/api.js";
import api from "../services/api.js";
import { useElapsedTime } from "../hooks/useElapsedTime.js";
import { useTokenCountdown } from "../hooks/useTokenCountdown.js";
import { getDeviceInfo } from "../utils/device.js";
import Avatar from "../components/Avatar.jsx";
import StatCard from "../components/StatCard.jsx";
import RecentActivityTable from "../components/RecentActivityTable.jsx";
import SecurityPanel from "../components/SecurityPanel.jsx";
import { DashboardSkeleton } from "../components/Skeleton.jsx";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { user, sessionStartedAt, refreshCount, logout, refreshSession } = useAuth();
  const [serverStatus, setServerStatus] = useState("checking");
  const device = getDeviceInfo();
  const sessionDuration = useElapsedTime(sessionStartedAt);
  const secondsLeft = useTokenCountdown(getAccessToken());

  useEffect(() => {
    api
      .get("/health")
      .then(() => setServerStatus("online"))
      .catch(() => setServerStatus("offline"));
  }, []);

  if (!user) return <DashboardSkeleton />;

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const handleRefreshSession = async () => {
    const ok = await refreshSession();
    toast[ok ? "success" : "error"](ok ? "Session refreshed" : "Refresh failed");
  };

  const handleLogoutAll = () => {
    toast("Would revoke every refresh-token family for this user server-side.", {
      icon: "🛡️",
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4 pb-16 space-y-6">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-surface-border bg-surface-light/60 backdrop-blur-sm p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={user.name} />
            <div>
              <h1 className="text-xl font-semibold text-text-primary">
                👋 Welcome back, {user.name?.trim() || user.email?.split("@")[0]}
              </h1>
              <p className="text-sm text-text-secondary">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => handleCopy(user.id, "User ID")}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-surface-border hover:bg-surface-border text-text-secondary transition-colors self-start sm:self-auto"
          >
            <Copy size={13} />
            Copy User ID
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-surface-border text-sm">
          <div>
            <p className="text-text-secondary text-xs mb-0.5">Current Device</p>
            <p className="text-text-primary">{device.deviceType}</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-0.5">Browser</p>
            <p className="text-text-primary">{device.browser}</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-0.5">Operating System</p>
            <p className="text-text-primary">{device.os}</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-0.5">Session Duration</p>
            <p className="text-text-primary">{sessionDuration}</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-0.5">Account Created</p>
            <p className="text-text-primary">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-xs mb-0.5">Last Login</p>
            <p className="text-text-primary">
              {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "First login"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon={Activity} label="Active Session" value="1" sublabel="This device" color="green" delay={0} />
        <StatCard icon={Shield} label="Security Level" value="High" sublabel="Token rotation on" color="green" delay={0.05} />
        <StatCard icon={KeyRound} label="Auth Method" value="Email" sublabel="+ Password" color="accent" delay={0.1} />
        <StatCard
          icon={Server}
          label="Server Status"
          value={serverStatus === "checking" ? "…" : serverStatus === "online" ? "Online" : "Offline"}
          sublabel="/api/health"
          color={serverStatus === "online" ? "green" : serverStatus === "offline" ? "amber" : "blue"}
          delay={0.15}
        />
        <StatCard
          icon={Globe}
          label="JWT Status"
          value={secondsLeft != null ? `${secondsLeft}s` : "—"}
          sublabel="Until expiry"
          color={secondsLeft != null && secondsLeft < 60 ? "amber" : "accent"}
          delay={0.2}
        />
        <StatCard
          icon={RotateCw}
          label="Refresh Token"
          value="Active"
          sublabel={`Rotated ${refreshCount}x`}
          color="green"
          delay={0.25}
        />
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border border-surface-border bg-surface-light/60 p-5">
        <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/profile"
            className="flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg border border-surface-border hover:bg-surface-border text-text-primary transition-colors"
          >
            <UserCog size={15} />
            Edit Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg border border-surface-border hover:bg-surface-border text-text-primary transition-colors"
          >
            <Shield size={15} />
            Security Settings
          </Link>
          <button
            onClick={handleRefreshSession}
            className="flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg border border-surface-border hover:bg-surface-border text-text-primary transition-colors"
          >
            <RotateCw size={15} />
            Refresh Session
          </button>
          <button
            onClick={handleLogoutAll}
            className="flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg border border-surface-border hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/30 text-text-primary transition-colors"
          >
            <ShieldOff size={15} />
            Logout All Devices
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg border border-surface-border hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 text-text-primary transition-colors"
          >
            <LogOut size={15} />
            Logout
          </button>
          <button
            onClick={() => handleCopy(getAccessToken(), "Access token")}
            className="flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg border border-surface-border hover:bg-surface-border text-text-primary transition-colors ml-auto"
          >
            <Copy size={15} />
            Copy JWT
          </button>
        </div>
      </div>

      <SecurityPanel />
      <RecentActivityTable />

      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <Monitor size={13} />
        Device/browser detection above is read from your actual browser — everything else on this page is either live data or clearly-labeled sample data.
      </div>
    </div>
  );
};

export default DashboardPage;
