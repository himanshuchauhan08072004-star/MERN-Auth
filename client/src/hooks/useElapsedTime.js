import { useEffect, useState } from "react";

const formatElapsed = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

export const useElapsedTime = (since) => {
  const [elapsed, setElapsed] = useState("0s");

  useEffect(() => {
    if (!since) return;
    const tick = () => setElapsed(formatElapsed(Date.now() - new Date(since).getTime()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [since]);

  return elapsed;
};
