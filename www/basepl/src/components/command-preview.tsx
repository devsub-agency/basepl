'use client'

import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  textToCopy: string
}

const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="size-7 rounded-md"
    >
      <Check className={cn('size-4 text-emerald-500', { hidden: !isCopied })} />
      <Copy
        className={cn('size-4 text-muted-foreground', { hidden: isCopied })}
      />
    </Button>
  )
}

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
        className="relative my-5 w-full rounded-lg border bg-accent/20 pt-1"
        onValueChange={(value) => setSelectedTab(value as PackageManager)}
      >
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent">
          {packageManagers.map((manager) => (
            <TabsTrigger
              key={manager}
              value={manager}
              className="rounded-none border-b !bg-transparent px-5 pb-3 pt-2 text-sm text-muted-foreground hover:text-foreground data-[state=active]:border-b-emerald-500 data-[state=active]:text-emerald-500"
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
