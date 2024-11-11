import { createFileRoute } from '@tanstack/react-router'

import Create_Books from "../../../_lib/views/admin/manage_books/Create_Books"

export const Route = createFileRoute('/admin/manage_books/qr_scan_add_books_form')({
  component: () => <Create_Books />
})