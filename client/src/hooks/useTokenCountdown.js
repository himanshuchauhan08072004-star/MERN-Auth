import { useEffect, useState } from "react";
import { getTokenExpiry } from "../utils/jwt.js";

export const useTokenCountdown = (token) => {
  const [secondsLeft, setSecondsLeft] = useState(null);

  useEffect(() => {
    if (!token) {
      setSecondsLeft(null);
      return;
    }
    const expiry = getTokenExpiry(token);
    if (!expiry) {
      setSecondsLeft(null);
      return;
    }

    const tick = () => {
      const diff = Math.round((expiry.getTime() - Date.now()) / 1000);
      setSecondsLeft(Math.max(diff, 0));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [token]);

  return secondsLeft;
};
