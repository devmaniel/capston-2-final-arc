import { createFileRoute } from '@tanstack/react-router'
import Onsite_request_landing from '../../../_lib/views/admin/manage_request/Onsite_request_landing'
export const Route = createFileRoute('/admin/manage_request/onsite_request')({
  component: () =>  <Onsite_request_landing />
})