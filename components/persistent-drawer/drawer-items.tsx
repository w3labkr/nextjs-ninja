import * as React from 'react'

import { cn } from '@/utils/tailwind'
import { ForwardButton } from '@/components/forward-button'

import { DrawerItemProps } from '@/types/dashboard'

export interface DrawerItemsProps {
  items: DrawerItemProps[]
  pathname: string
}

export function DrawerItems({ items, pathname }: DrawerItemsProps) {
  return items.map((item) => (
    <ForwardButton
      variant="ghost"
      key={item.id}
      href={item.href}
      className={cn(
        'relative flex h-auto rounded px-1 py-0.5 text-sm transition-all',
        'text-gray-500 hover:bg-transparent hover:text-gray-900',
        'dark:text-gray-400 dark:hover:text-gray-50',
        pathname.startsWith(item.href) ? 'text-gray-900 dark:text-gray-50' : ''
      )}
      startIconName={item.iconName}
      text={item.title}
      translate={item.translate}
      disabled={item.disabled}
    />
  ))
}