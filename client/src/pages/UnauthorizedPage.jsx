import ErrorPage from "../components/ErrorPage.jsx";

const UnauthorizedPage = () => (
  <ErrorPage
    code="401"
    title="Session expired"
    message="Your access token has expired or is invalid. Please log in again."
    actionLabel="Log in"
    actionTo="/login"
  />
);

export default UnauthorizedPage;
