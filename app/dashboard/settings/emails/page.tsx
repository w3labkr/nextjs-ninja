import * as React from 'react'

import { ChangeEmailForm } from './change-email-form'
import { authenticate } from '@/lib/supabase/auth'

export default async function EmailsPage() {
  const { authenticated, user } = await authenticate()

  if (!user) return null

  return (
    <main className="flex-1 overflow-auto p-10 pb-16">
      <div className="space-y-16">
        <ChangeEmailForm user={user} />
      </div>
    </main>
  )
}
