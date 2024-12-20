'use client'

import { Index } from '@/docs'
import { getComponentContent } from '@/lib/file-reader'
import { cn } from '@/lib/utils'
import '@/style/mdx.css'
import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getMediaUrl } from '@/lib/media-url'
import { SyntaxHighlighter } from './syntax-highlighter'

interface ConfigPreviewProps {
  name: string
  componentName: string
  imagePath: string
  className?: string
}
type Tabs = 'Preview' | 'Code'

export function BlockPreview({
  name,
  className,
  imagePath,
}: ConfigPreviewProps) {
  const [configContent, setConfigContent] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<Tabs>('Preview')

  const packageManagers: Tabs[] = ['Preview', 'Code']
  const finalImageUrl = getMediaUrl(imagePath)
  const config = Index[name]

  useEffect(() => {
    async function loadContent() {
      if (!config) return
      const fileContent = await getComponentContent(config.file.path)
      setConfigContent(fileContent)
    }
    loadContent()
  }, [name])

  if (!config) {
    return (
      <p className="text-sm text-muted-foreground">
        Component not found in registry.
      </p>
    )
  }

  function getTabContent(tab: Tabs) {
    switch (tab) {
      case 'Preview':
        return (
          <Image
            src={'/' + imagePath}
            alt={name}
            className="w-full rounded-lg object-contain"
            width={600}
            height={600}
          />
        )
      case 'Code':
        return <SyntaxHighlighter code={configContent} />
      default:
        return <></>
    }
  }

  return (
    <div
      className={cn('group relative my-4 flex flex-col space-y-2', className)}
    >
      <Tabs
        defaultValue={selectedTab}
        className="relative mb-8 mt-6 w-full rounded-lg border bg-accent/20"
        onValueChange={(value) => setSelectedTab(value as Tabs)}
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
          className="relative flex items-center px-5 pb-5 pt-3 text-sm text-muted-foreground"
        >
          <div className="item-center flex max-h-[480px] w-full justify-center overflow-auto">
            {getTabContent(selectedTab)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
