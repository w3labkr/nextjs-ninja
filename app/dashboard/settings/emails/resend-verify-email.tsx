'use client'

import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'
import { SubmitButton } from '@/components/submit-button'
import { EmailListItemContext } from './email-list-item-provider'

import { fetcher } from '@/lib/utils'

export function ResendVerifyEmail() {
  const state = React.useContext(EmailListItemContext)
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const { t } = useTranslation()

  const handleClick = async () => {
    try {
      setIsSubmitting(true)

      if (!state?.user_id) throw new Error('Something went wrong.')

      const result = await fetcher(`/api/v1/email/verify/${state?.user_id}`, {
        method: 'POST',
        body: JSON.stringify({ email: state?.email }),
      })

      if (result?.error) throw new Error(result?.error?.message)

      toast.success(t('FormMessage.email_has_been_successfully_sent'))
    } catch (e: unknown) {
      toast.error((e as Error)?.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (state?.isVerified) return null

  return (
    <SubmitButton
      isSubmitting={isSubmitting}
      type="button"
      variant="link"
      className="h-auto p-0 text-xs font-semibold text-blue-700"
      onClick={handleClick}
      text="ResendVerificationButton.label"
      translate="yes"
    />
  )
}
