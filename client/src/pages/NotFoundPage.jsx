import ErrorPage from "../components/ErrorPage.jsx";

const NotFoundPage = () => (
  <ErrorPage code="404" title="Page not found" message="The page you're looking for doesn't exist." />
);

export default NotFoundPage;
