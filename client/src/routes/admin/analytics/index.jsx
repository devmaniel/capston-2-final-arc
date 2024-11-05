import { createFileRoute } from '@tanstack/react-router'

import Analytics_landing_page from '../../../_lib/views/admin/manage_analytics/analytics_landing_page'

export const Route = createFileRoute('/admin/analytics/')({
  component: () => <Analytics_landing_page/>
})