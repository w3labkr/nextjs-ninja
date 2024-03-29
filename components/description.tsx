'use client'

import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

export interface DescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  text?: string | undefined
}

export function Description({
  children,
  className,
  text,
  translate,
  ...props
}: DescriptionProps) {
  const { t } = useTranslation()

  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props}>
      {text && translate === 'yes' ? t(text) : text}
      {children}
    </p>
  )
}
