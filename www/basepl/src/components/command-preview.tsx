'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CopyButton } from './copy-button'

interface CommandPreviewProps {
  npmCommand: string
  pnpmCommand: string
}

export const CommandPreview = ({
  npmCommand = 'npm i',
  pnpmCommand = 'pnpm i',
}: CommandPreviewProps) => {
  type PackageManager = 'npm' | 'pnpm'
  const [selectedTab, setSelectedTab] = useState<PackageManager>('npm')
  const packageManagers: PackageManager[] = ['npm', 'pnpm']

  const getCommandByTab = (tab: string) => {
    switch (tab) {
      case 'npm':
        return npmCommand
      case 'pnpm':
        return pnpmCommand
      default:
        return npmCommand
    }
  }

  return (
    <div className="relative">
      <Tabs
        defaultValue={selectedTab}
        className="relative mb-8 mt-6 w-full rounded-lg border bg-accent/20"
        onValueChange={(value) => setSelectedTab(value as PackageManager)}
      >
        <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
          {packageManagers.map((manager) => (
            <TabsTrigger
              key={manager}
              value={manager}
              className="rounded-none border-b border-b-transparent !bg-transparent px-5 pb-3 pt-3 text-sm text-muted-foreground hover:text-foreground data-[state=active]:border-b-emerald-500 data-[state=active]:text-emerald-500"
            >
              {manager}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent
          value={selectedTab}
          className="flex items-center px-5 pb-3 pt-1 text-sm text-muted-foreground"
        >
          <pre data-language="bash">
            <code>{getCommandByTab(selectedTab)}</code>
          </pre>
          <div className="ml-auto">
            <CopyButton textToCopy={getCommandByTab(selectedTab)} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
