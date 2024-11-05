import { createFileRoute, redirect } from '@tanstack/react-router'

import Edit_Books from '../../../_lib/views/admin/manage_books/Edit_Books'

export const Route = createFileRoute('/admin/manage_books/edit_book')({
  component: Edit_Books,
  validateSearch: (search) => {
    return {
      book_id: search.book_id,
    }
  },
  beforeLoad: ({ search }) => {
    if (!search.book_id) {
      throw redirect({
        to: '/admin/manage_books',
        replace: true,
      })
    }
  },
})
