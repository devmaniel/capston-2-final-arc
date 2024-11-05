import { createFileRoute } from '@tanstack/react-router'

import Lrn_landing from '../../../_lib/views/admin/manage_lrn/lrn_landing'

export const Route = createFileRoute('/admin/manage_lrn/')({
  component: () => <Lrn_landing />
})