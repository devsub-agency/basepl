"use client"

import * as React from "react"
import {Index} from "docs"
import {cn} from "@/lib/utils"
import dynamic from "next/dynamic"
import {getComponentContent} from "@/lib/file-reader"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {CopyButton} from "@/components/ui/copy-button"

interface ComponentPreviewProps {
  name: string
  description?: string
  className?: string
}

export function ComponentPreview({name, description, className}: ComponentPreviewProps) {
  console.log('in component preview', name);
  const [content, setContent] = React.useState<string | null>(null)
  const component = Index[name]
  console.log('component', component);

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.file?.component

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name])

  React.useEffect(() => {
    async function loadContent() {
      if (!component) return
      const fileContent = await getComponentContent(component.file.path)
      setContent(fileContent)
    }

    loadContent()
  }, [name])

  if (!component) {
    return (
      <p className="text-sm text-muted-foreground">
        Component <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{name}</code> not found.
      </p>
    )
  }

  return (
    <div className={cn("group relative my-4 flex flex-col space-y-2", className)}>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <Tabs defaultValue={Preview ? "preview" : "code"} className="relative w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          {Preview && (
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold"
            >
              Preview
            </TabsTrigger>
          )}
          <TabsTrigger
            value="code"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold"
          >
            Code
          </TabsTrigger>
        </TabsList>

        {Preview && (
          <TabsContent value="preview" className="relative rounded-md border">
            <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
              {Preview}
            </div>
          </TabsContent>
        )}

        <TabsContent value="code">
          <div className="relative">
            {content && (
              <>
                <CopyButton
                  value={content}
                  className="absolute right-4 top-4"
                />
                <pre className="max-h-[350px] overflow-auto rounded-md border p-4">
                  <code>{content}</code>
                </pre>
              </>
            )}
            {!content && (
              <div className="flex h-[100px] items-center justify-center">
                Loading...
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
