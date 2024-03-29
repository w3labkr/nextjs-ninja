import * as React from 'react'

import { EmailList } from './email-list'
import { authenticate } from '@/lib/supabase/auth'

export default async function EmailsPage() {
  const { user } = await authenticate()

  return (
    <main className="flex-1 overflow-auto p-10 pb-16">
      <div className="space-y-16">
        <EmailList user={user} />
      </div>
    </main>
  )
}
