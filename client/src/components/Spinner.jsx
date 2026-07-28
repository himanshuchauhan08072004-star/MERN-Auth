const Spinner = ({ full = true }) => (
  <div className={full ? "flex items-center justify-center min-h-screen" : "flex items-center justify-center py-8"}>
    <div className="h-8 w-8 rounded-full border-2 border-surface-border border-t-accent animate-spin" />
  </div>
);

export default Spinner;
