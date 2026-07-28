import ErrorPage from "../components/ErrorPage.jsx";

const ForbiddenPage = () => (
  <ErrorPage
    code="403"
    title="Access denied"
    message="You don't have permission to view this page."
  />
);

export default ForbiddenPage;
