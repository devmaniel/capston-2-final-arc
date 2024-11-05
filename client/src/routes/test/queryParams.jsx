import { createFileRoute } from "@tanstack/react-router";

const pageFilter = {
  page: 1,
};

export const Route = createFileRoute("/test/queryParams")({
  validateSearch: (search) => {
    return {
      page: search.page || "",
    };
  },
  component: () => QueryTest(),
});

function QueryTest() {
  const { page } = Route.useSearch();
  return (
    <>
      <div>Hello /test/queryParams!</div>
      <pre>{JSON.stringify({ page }, null, 2)}</pre>
    </>
  );
}
