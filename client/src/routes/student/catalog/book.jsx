import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"; // Use useNavigate instead of navigate
import { axiosFetch } from "../../../_lib/hook/axiosFetch";
import Nav from "../../../_lib/views/screen/student/common/Nav";
import Footer from "../../../_lib/views/screen/student/common/Footer";
import TopBook from "@studentscreens/TopBook";
import Booklist from "@studentscreens/Booklist";
import auth from "../../../_lib/api/auth";
import React, { useEffect } from "react";

export const Route = createFileRoute("/student/catalog/book")({
  validateSearch: (search) => {
    if (!search.bookId) {
      throw redirect({ to: "/student/catalog" });
    }
    return { bookId: search.bookId };
  },
  beforeLoad: async ({ search }) => {
    // Access search to retrieve bookId
    const role = "student";
    const authResult = await auth(role);

    if (authResult.success) {
      if (authResult.role !== role) {
        console.log(
          `Role mismatch detected. Expected: ${role}, Found: ${authResult.role}`
        );
        // Redirect to the specific admin path with the bookId in case of role mismatch
        throw redirect({
          to: `/admin/manage_books/edit_book?book_id=${search.bookId}`,
        });
      }
      return {};
    } else {
      switch (authResult.reason) {
        case "session_not_found":
        case "invalid_session":
        case "expired_session":
          console.log(`Error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
        case "pending_violations":
          console.log(
            "User has pending violations. Redirecting to /violations_page"
          );
          throw redirect({ to: "/violations_page" });
        case "role_mismatch":
          console.log(
            `Role mismatch. Redirecting to: ${role === "admin" ? "/student" : `/admin/manage_books/edit_book?book_id=${search.bookId}`}`
          );
          throw redirect({
            to:
              role === "admin"
                ? "/student"
                : `/admin/manage_books/edit_book?book_id=${search.bookId}`,
          });
        case "unenrolled":
          console.log("User is no longer enrolled. Redirecting to /noLonger");
          throw redirect({ to: "/noLonger" });
        default:
          console.log(`Unexpected error reason: ${authResult.reason}`);
          throw redirect({ to: "/login" });
      }
    }
  },
  component: BookComponent,
});

import Loading from "../../../_lib/views/Loading";
import { useState } from "react";
import axios from "../../../_lib/api/axios";
import Cookies from "js-cookie";

import useAxiosBookBottomCatalog from "../../../_lib/hook/useAxiosBookBottomCatalog";

function BookComponent() {
  const { bookId } = Route.useSearch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [delayOver, setDelayOver] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(null);

  const sessionId = Cookies.get("sessionId");

  const fetchSingleBook = async (bookId) => {
    try {
      const response = await axios.post(
        `/student/fetch-single-book`,
        { bookId, sessionId },
        {
          headers: { Authorization: `Bearer ${sessionId}` },
          validateStatus: (status) => status >= 200 && status < 500,
        }
      );

      const { data: bookData, status: fetchStatus } = response;
      setBookData(bookData);
      setFetchStatus(fetchStatus);
    } catch (error) {
      console.error("Error fetching book:", error);
      setFetchStatus(500);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchSingleBook(bookId);
    }
  }, [bookId]);

  useEffect(() => {
    const timer = setTimeout(() => setDelayOver(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fetchStatus === 404) {
      navigate({ to: "/student/catalog" });
    } else if (fetchStatus >= 200 && fetchStatus < 300) {
      setLoading(false);
    }
  }, [fetchStatus, bookId, navigate]);

  const {
    data: books,
    loading: bottomLoading,
    error,
  } = useAxiosBookBottomCatalog(bookData?.classifications_name, bookId);


  if (loading || !delayOver || !bookData) {
    return <Loading />;
  }

  console.log("Books Bottom", books);

  return (
    <>
      <Nav />
      <div className="TopBookCon">
        <TopBook bookData={bookData} />
      </div>
      {bottomLoading ? (
        <Loading />
      ) : (
        <Booklist className="mb-10" booksList={books} />
      )}
      <Footer />
    </>
  );
}
