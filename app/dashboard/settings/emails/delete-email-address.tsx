'use client'

import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'
import { LucideIcon } from '@/lib/lucide-icon'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { EmailListItemContext } from './email-list-item-provider'

import { User } from '@supabase/supabase-js'
import { fetcher } from '@/lib/utils'
import { useSWRConfig } from 'swr'

export function DeleteEmailAddress({ user }: { user: User | null }) {
  const state = React.useContext(EmailListItemContext)
  const { t } = useTranslation()
  const { mutate } = useSWRConfig()

  const handleClick = async () => {
    try {
      const deleted = await fetcher(`/api/v1/email/${user?.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ email: state?.email }),
      })

      if (deleted?.error) throw new Error(deleted?.error?.message)

      mutate(`/api/v1/emails/${user?.id}`)

      toast.success(t('FormMessage.email_has_been_successfully_deleted'))
    } catch (e: unknown) {
      toast.error((e as Error)?.message)
    }
  }

  if (state?.isPrimary) return null

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="h-auto p-1.5 text-red-700 hover:bg-red-700 hover:text-white"
        >
          <LucideIcon name="Trash" className="size-4 min-w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('DeleteEmailAddress.AlertDialogTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('DeleteEmailAddress.AlertDialogDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('DeleteEmailAddress.AlertDialogCancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>
            {t('DeleteEmailAddress.AlertDialogAction')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
