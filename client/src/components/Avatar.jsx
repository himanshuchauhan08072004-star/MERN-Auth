const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

const Avatar = ({ name, size = 56 }) => (
  <div
    className="rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-semibold shrink-0"
    style={{ width: size, height: size, fontSize: size * 0.36 }}
  >
    {getInitials(name)}
  </div>
);

export default Avatar;
