export const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/api/auth", // cookie only sent to auth routes, not the whole app
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearRefreshCookieOptions = {
  ...refreshCookieOptions,
  maxAge: 0,
};
