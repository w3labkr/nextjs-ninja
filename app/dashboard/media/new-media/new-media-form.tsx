import * as React from 'react'

import { Separator } from '@/components/ui/separator'
import { Title } from '@/components/title'
import { Description } from '@/components/description'

export function NewMediaForm() {
  return (
    <div className="space-y-4">
      <Title text="NewMediaForm.title" translate="yes" />
      <Separator />
      <Description text="NewMediaForm.description" translate="yes" />
      ...
    </div>
  )
}
