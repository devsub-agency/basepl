'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { Index } from '@/docs'

import { getComponentContent } from '@/lib/file-reader'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { SyntaxHighlighter } from './syntax-highlighter'

interface ComponentPreviewProps {
  name: string
  componentName: string
  className?: string
}
type Tabs = 'Preview' | 'Sample' | 'Code'

export function ComponentPreview({
  name,
  className,
  componentName,
}: ComponentPreviewProps) {
  const [sampleCode, setSampleCode] = useState<string>('')
  const [componentContent, setComponentContent] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<Tabs>('Preview')

  const packageManagers: Tabs[] = ['Preview', 'Sample', 'Code']
  const component = Index[name]
  const plComponent = Index[componentName]
  const Preview = Index[name]?.file?.component

  useEffect(() => {
    async function loadContent() {
      if (!component) return
      const fileContent = await getComponentContent(component.file.path)
      setSampleCode(fileContent)
    }
    async function loadComponent() {
      if (!plComponent) return
      const fileContent = await getComponentContent(plComponent.file.path)
      setComponentContent(fileContent)
    }
    loadComponent()
    loadContent()
  }, [name])

  if (!component) {
    return (
      <p className="text-sm text-muted-foreground">
        Component{' '}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{' '}
        not found.
      </p>
    )
  }

  function getTabContent(tab: Tabs) {
    switch (tab) {
      case 'Preview':
        return <Preview />
      case 'Sample':
        return <SyntaxHighlighter code={sampleCode} />
      case 'Code':
        return <SyntaxHighlighter code={componentContent} />
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
