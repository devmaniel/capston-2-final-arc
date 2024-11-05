import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <div>Hello /!</div>,
  beforeLoad: () => {
    throw redirect({
      to: '/login',
    })
  },
})