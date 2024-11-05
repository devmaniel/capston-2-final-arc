import { createFileRoute, redirect } from "@tanstack/react-router";
// views
import ManageBooks from "@views/admin/manage_books/page";

import { classifications } from "../../../_lib/data/ClassificationsData";

import auth from "../../../_lib/api/auth";

const Based = {
  filter: ["newest", "oldest", "a-z", "z-a"],
  classifications: classifications.map((classification) => classification.toLowerCase()), // Convert to lowercase
};

export const Route = createFileRoute("/admin/manage_books/")({
  validateSearch: (search) => {
    return {
      page: search.page ? parseInt(search.page, 10) : 1,
      filter: (search.filter || "newest").toLowerCase(),
      classifications: (search.classifications || "all").toLowerCase(), // Convert to lowercase
      book_status: ["active", "archived", "deleted"].includes(search.book_status?.toLowerCase())
        ? search.book_status.toLowerCase()
        : "active",
    };
  },
  beforeLoad: async ({ search }) => {
    const role = "admin"; // Adjust role as needed for your scenario

    try {
      const authResult = await auth(role); // Assuming auth function is available

      if (authResult.success) {
        if (authResult.role !== role) {
          console.log(`Role mismatch detected. Expected: ${role}, Found: ${authResult.role}`);
          throw redirect({ to: authResult.role === 'student' ? '/student' : '/login' });
        }

        // Proceed with session checks and validation
        const { page, filter, classifications, book_status } = search;

        if (
          !page ||
          !filter ||
          page < 1 ||
          !Based.filter.includes(filter.toLowerCase()) ||
          !Based.classifications.includes(classifications.toLowerCase()) || // Comparison in lowercase
          !["active", "archived", "deleted"].includes(book_status.toLowerCase())
        ) {
          throw redirect({
            to: "/admin/manage_books",
            search: {
              page: 1,
              filter: "newest",
              classifications: "all",
              book_status: "active",
            },
          });
        }

        // If everything is valid, continue loading the component
        return {};
      } else {
        // Redirect based on the error reason
        switch (authResult.reason) {
          case "invalid_session":
          case "expired_session":
          case "error":
            console.log(`Error reason: ${authResult.reason}`);
            throw redirect({ to: "/login" });
          case "role_mismatch":
            console.log(`Role mismatch. Redirecting to: ${role === "admin" ? "/student" : "/admin"}`);
            throw redirect({ to: role === "admin" ? "/student" : "/admin" });
          default:
            console.log(`Unexpected error reason: ${authResult.reason}`);
            throw redirect({ to: "/login" });
        }
      }
    } catch (error) {
      console.error("Redirect Error:", error);
      throw redirect({ to: "/login" }); // Ensure that any other errors are properly handled
    }
  },
  component: () => {
    const { page, filter, classifications, book_status } = Route.useSearch();

    return (
      <ManageBooks
        pageNum={page}
        pageFil={filter}
        pageClass={classifications}
        bookStatus={book_status}
        classDataTest={Based.classifications}
      />
    );
  },
});
