import ErrorPage from "../components/ErrorPage.jsx";

const ServerErrorPage = () => (
  <ErrorPage
    code="500"
    title="Something went wrong"
    message="An unexpected error occurred on our end. Please try again shortly."
  />
);

export default ServerErrorPage;
