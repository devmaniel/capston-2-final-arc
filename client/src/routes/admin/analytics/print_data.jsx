import { createFileRoute } from '@tanstack/react-router'

import PrintDataIndex from '../../../_lib/views/admin/manage_analytics/print_data/PrintDataIndex';


export const Route = createFileRoute('/admin/analytics/print_data')({
  component: () => <PrintDataIndex   />
})