import { Link } from "react-router-dom";

const ErrorPage = ({ code, title, message, actionLabel = "Go home", actionTo = "/" }) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
    <h1 className="text-6xl font-bold text-accent">{code}</h1>
    <p className="text-lg text-text-primary mt-2">{title}</p>
    <p className="text-text-secondary mt-1 mb-6 max-w-sm">{message}</p>
    <Link to={actionTo} className="px-4 py-2 rounded-md bg-accent hover:bg-accent-hover text-white transition-colors">
      {actionLabel}
    </Link>
  </div>
);

export default ErrorPage;
