"use client"

import { CopyButton } from "@/components/ui/copy-button"
import { Index } from "@/docs"
import { getComponentContent } from "@/lib/file-reader"
import { cn } from "@/lib/utils"
import '@/style/mdx.css'
import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface ConfigPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description?: string
  className?: string,
}

export function CodePreview({ name, description, className, children, ...props }: ConfigPreviewProps) {
  const [configContent, setConfigContent] = React.useState<string | null>(null)
  const [componentContent, setComponentContent] = React.useState<string | null>(null)
  const config = Index[name]
  const component = Index[name + '-Component']

  React.useEffect(() => {
    async function loadContent() {
      if (!config) return
      const configFile = config.file
      if (configFile) {
        const fileContent = await getComponentContent(configFile.path)
        setConfigContent(fileContent)
      }
    }
    async function loadComponent() {
      if (!component) return
      const componentFile = component.file
      if (componentFile) {
        const fileContent = await getComponentContent(componentFile.path)
        setComponentContent(fileContent)
      }
    }
    loadContent()
    loadComponent()
  }, [name])

  if (!config && !component) {
    return (
      <p className="text-sm text-muted-foreground">
        Component <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{name}</code> not found in registry.
      </p>
    )
  }

  return (
    <div className={cn("group relative my-4 flex flex-col space-y-2", className)}>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <Tabs defaultValue={configContent ? 'config' : "component"} className="relative w-full">
        <TabsList>
          {configContent && (
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold"
            >
              Config
            </TabsTrigger>
          )}
          {componentContent && (
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold"
            >
              Component
            </TabsTrigger>
          )}
        </TabsList>

        {configContent && (
          <TabsContent value="preview" className="relative rounded-md border">
            <>
              <CopyButton
                value={configContent}
                className="absolute right-4 top-4"
              />
              <pre className="max-h-[350px] overflow-auto rounded-md border p-4">
                <code>{configContent}</code>
              </pre>
            </>
          </TabsContent>
        )}

        {componentContent && (
          <TabsContent value="code" className="relative rounded-md border">
            <>
              <CopyButton
                value={componentContent}
                className="absolute right-4 top-4"
              />
              <pre className="max-h-[350px] overflow-auto rounded-md border p-4">
                <code>{componentContent}</code>
              </pre>
            </>
          </TabsContent>
        )}

      </Tabs>
    </div>
  )
}
