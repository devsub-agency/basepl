'use client'
import { useEffect, useState } from 'react'
import { CopyButton } from './copy-button'
import { codeToHtml } from 'shiki'

interface SyntaxHighlighterProps {
  code: string
}

export const SyntaxHighlighter = ({ code }: SyntaxHighlighterProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string>('')
  const [highlightedCodeDark, setHighlightedCodeDark] = useState<string>('')

  useEffect(() => {
    const transformer = {
      pre(node: any) {
        node.properties.style = 'background-color: transparent;'
        return node
      },
    }

    async function highlightCode() {
      const htmlForLightMode = await codeToHtml(code, {
        lang: 'typescript',
        theme: 'github-light',
        transformers: [transformer],
      })
      setHighlightedCode(htmlForLightMode)
    }

    async function highlightCodeForDarkMode() {
      const htmlForLightMode = await codeToHtml(code, {
        lang: 'typescript',
        theme: 'github-dark',
        transformers: [transformer],
      })
      setHighlightedCodeDark(htmlForLightMode)
    }

    highlightCodeForDarkMode()
    highlightCode()
  }, [code])

  return (
    <div className="realtive h-full w-full">
      <div
        className="block dark:hidden"
        dangerouslySetInnerHTML={{
          __html: highlightedCode,
        }}
      />
      <div
        className="hidden dark:block"
        dangerouslySetInnerHTML={{
          __html: highlightedCodeDark,
        }}
      />
      <div className="absolute right-3 top-1 rounded-lg bg-accent md:bg-transparent">
        <CopyButton textToCopy={code} />
      </div>
    </div>
  )
}
