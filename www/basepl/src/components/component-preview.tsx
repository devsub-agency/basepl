'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { Index } from '@/docs'

import { getComponentContent } from '@/lib/file-reader'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { SyntaxHighlighter } from './syntax-highlighter'

interface ComponentPreviewProps {
  componentName: string
  sampleName?: string
  className?: string
}
type Tabs = 'Preview' | 'Config sample' | 'Code'

export function ComponentPreview({
  sampleName,
  componentName,
  className,
}: ComponentPreviewProps) {
  const [sampleCode, setSampleCode] = useState<string>('')
  const [componentContent, setComponentContent] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<Tabs>('Preview')

  const tabsWithSample: Tabs[] = ['Preview', 'Code', 'Config sample']
  const tabsWithoutSample: Tabs[] = ['Preview', 'Code']
  const tabs = sampleName ? tabsWithSample : tabsWithoutSample
  
  const sampleComponent = sampleName && Index[sampleName]
  const ComponentPreview = sampleName && Index[sampleName]?.file?.component
  const component = Index[componentName + '-Component']

  useEffect(() => {
    async function loadContent() {
      if (!sampleComponent) return
      const fileContent = await getComponentContent(sampleComponent.file.path)
      setSampleCode(fileContent)
    }
    async function loadComponent() {
      if (!component) return
      const fileContent = await getComponentContent(component.file.path)
      setComponentContent(fileContent)
    }
    loadComponent()
    loadContent()
  }, [])

  if (!component) {
    return (
      <p className="text-sm text-muted-foreground">
        sampleComponent not found.
      </p>
    )
  }

  function getTabContent(tab: Tabs) {
    switch (tab) {
      case 'Config sample':
        return <SyntaxHighlighter code={sampleCode} />
      case 'Code':
        return <SyntaxHighlighter code={componentContent} />
      case 'Preview':
        return (
          <div className="flex h-96 w-full items-center justify-center overflow-y-auto">
            <ComponentPreview />
          </div>
        )
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
          {tabs.map((manager) => (
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
