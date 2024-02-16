import * as React from 'react'

import { mediaConfig } from '@/config/dashboard'
import { AppBarProvider } from '@/context/app-bar-provider'
import { MiniDrawer } from '@/components/dashboard/mini-drawer'
import { AppBar } from '@/components/dashboard/app-bar'
import { PersistentDrawer } from '@/components/dashboard/persistent-drawer'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="body-overflow-hidden flex h-screen w-screen min-w-[768px]">
      <AppBarProvider value={{ height: 'h-[50px]' }}>
        <MiniDrawer />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25} className="max-w-64 !overflow-auto">
            <PersistentDrawer
              className="w-full border-none lg:max-w-full"
              drawerGroupItems={mediaConfig.drawerGroupItems}
              title="Media"
              translate="yes"
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} className="relative !overflow-auto">
            <AppBar className="sticky left-0 top-0 z-10" />
            <div className="flex flex-1 flex-col">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </AppBarProvider>
    </div>
  )
}