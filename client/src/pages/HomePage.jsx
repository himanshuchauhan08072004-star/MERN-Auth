import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  KeyRound,
  RotateCw,
  Lock,
  Cookie,
  Gauge,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import Footer from "../components/Footer.jsx";

const features = [
  {
    icon: KeyRound,
    title: "Two-Token Auth",
    desc: "Short-lived 15-minute access tokens paired with long-lived, rotating refresh tokens.",
  },
  {
    icon: RotateCw,
    title: "Rotation & Reuse Detection",
    desc: "Every refresh token is single-use. A replayed token revokes the entire session family.",
  },
  {
    icon: Cookie,
    title: "HttpOnly Cookies",
    desc: "Refresh tokens never touch JavaScript — immune to XSS-based token theft.",
  },
  {
    icon: Lock,
    title: "bcrypt Password Hashing",
    desc: "Passwords hashed with a cost factor of 12, never stored or returned in plaintext.",
  },
  {
    icon: Gauge,
    title: "Rate Limited",
    desc: "Auth endpoints are throttled to blunt brute-force and credential-stuffing attempts.",
  },
  {
    icon: ShieldCheck,
    title: "Hardened Headers",
    desc: "Helmet, CORS with credentials, and Mongo input sanitization on every request.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4 },
  }),
};

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, rgba(99,102,241,0.25), transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center px-4 pt-24 pb-16">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-surface-border bg-surface-light text-text-secondary mb-6"
          >
            <ShieldCheck size={13} className="text-accent" />
            Production-grade token security
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl font-bold text-text-primary mb-4 tracking-tight"
          >
            Authentication done <span className="text-accent">right</span>.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-text-secondary text-lg mb-8"
          >
            A reference MERN auth system: access + refresh tokens, rotation,
            reuse detection, and zero secrets exposed to the client.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="flex justify-center gap-3"
          >
            {user ? (
              <Link
                to="/dashboard"
                className="group flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
              >
                Go to Dashboard
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="group flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
                >
                  Get Started
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-lg border border-surface-border hover:bg-surface-light text-text-primary font-medium transition-colors"
                >
                  Log In
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features / Security highlights */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={i}
              className="rounded-xl border border-surface-border bg-surface-light/60 backdrop-blur-sm p-5 hover:border-accent/40 transition-colors"
            >
              <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                <Icon size={18} className="text-accent" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">{title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="rounded-2xl border border-surface-border bg-gradient-to-br from-accent/10 to-transparent p-10">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              Ready to try it?
            </h2>
            <p className="text-text-secondary mb-6">
              Create an account and see the full token lifecycle in the dashboard.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
            >
              Create Free Account
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
