"use client"

import '@/style/mdx.css'
import * as React from "react"
import { Index } from "@/docs"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/ui/copy-button"
import { getComponentContent } from "@/lib/file-reader"

interface ConfigPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description?: string
  className?: string,
}

export function ConfigPreview({ name, description, className, children, ...props}: ConfigPreviewProps) {
  const [content, setContent] = React.useState<string | null>(null)
  const component = Index[name]

  React.useEffect(() => {
    async function loadContent() {
      if (!component) return
      const configFile = component.file
      if (configFile) {
        const fileContent = await getComponentContent(configFile.path)
        setContent(fileContent)
      }
    }
    loadContent()
  }, [name])

  if (!component) {
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
      <div className="relative">
        {content && (
          <>
            <CopyButton
              value={content}
              className="absolute right-4 top-4"
            />
            <pre className="max-h-[350px] overflow-auto rounded-md p-4">
          <code className="relative text-sm">{content}</code>
        </pre>
          </>
        )}
        {!content && (
          <div className="flex h-[100px] items-center justify-center text-sm text-muted-foreground">
            Loading...
          </div>
        )}
      </div>
    </div>
  )
}
