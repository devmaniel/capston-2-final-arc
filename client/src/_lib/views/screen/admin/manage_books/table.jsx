import React from "react";
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { BiSolidArchive } from "react-icons/bi";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

import { useNavigate } from "@tanstack/react-router";

import Swal from "sweetalert2";

import { format } from "date-fns";

const table = ({ data, handleSetBookStatus, setBookStatusLoading }) => {
  const navigate = useNavigate();

  // Function to handle the edit confirmation
  const EditButtonLink = (book_id) => {
    Swal.fire({
      title: "Are you sure you want to edit this?",
      text: "Make sure the changes you make are accurate.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to the edit book page using TanStack Router
        navigate({
          to: `/admin/manage_books/edit_book?book_id=${book_id}`,
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto bg-neutral mt-5 p-5 text-base-100">
      <table className="table table-xl">
        <thead className="text-base-100">
          <tr>
            <th>Book ID</th>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>ISBN Code</th>
            <th>Classifications</th>
            <th>Quantity</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((book) => (
              <tr key={book.id}>
                <th>{book.id}</th>
                <td>{book.book_name}</td>
                <td>{book.book_author}</td>
                <td>{book.isbn_code}</td>
                <td>{book.classifications_name}</td>
                <td>{book.quantity}</td>
                <td>
                  {format(new Date(book.createdAt), "MMMM do yyyy, h:mm:ss a")}
                </td>

                <td>
                  <ul className="flex gap-2 justify-center items-center">
                    <li>
                      <MdEditSquare
                        onClick={() => EditButtonLink(book.id)} // Pass book id to function
                        style={{ cursor: "pointer" }}
                      />
                    </li>
                    {/* Conditionally render buttons based on book_status */}
                    {book.book_status === "active" ? (
                      <li>
                        <BiSolidArchive
                          onClick={() =>
                            handleSetBookStatus(
                              book.id,
                              "active",
                              setBookStatusLoading
                            )
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </li>
                    ) : (
                      <>
                        <li>
                          <RiInboxUnarchiveFill
                            onClick={() =>
                              handleSetBookStatus(
                                book.id,
                                "archived",
                                setBookStatusLoading
                              )
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </li>
                        <li>
                          <MdDeleteForever
                            onClick={() =>
                              handleSetBookStatus(
                                book.id,
                                "delete",
                                setBookStatusLoading
                              )
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </li>
                      </>
                    )}
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                <h1 className="text-2xl">No Data</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default table;
