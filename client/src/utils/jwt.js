// Display-only decode — NOT a security check. The server is the only
// party that verifies the signature. We just want the exp claim to
// show a countdown in the UI.
export const decodeJwtPayload = (token) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export const getTokenExpiry = (token) => {
  const payload = decodeJwtPayload(token);
  return payload?.exp ? new Date(payload.exp * 1000) : null;
};
