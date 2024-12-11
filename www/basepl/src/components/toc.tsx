"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface TocProps {
  rawBody: string
  className?: string
}

interface TocItem {
  title: string
  slug: string
  level: number
}

function getTableOfContents(raw: string): TocItem[] {
  const headingLines = raw
    .split("\n")
    .filter((line) => line.match(/^#{2,6}\s/)) // Match headings level 2-6

  return headingLines.map((raw) => {
    const match = raw.match(/^(#{2,6})\s(.+)$/)
    if (!match) return null

    const [, level, title] = match

    return {
      level: level.length,
      title: title.trim(),
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-"),
    }
  }).filter(Boolean) as TocItem[]
}

export default function TableOfContents({ rawBody, className }: TocProps) {
  const items = React.useMemo(() => getTableOfContents(rawBody), [rawBody])

  if (!items.length) {
    return null
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="font-medium">On This Page</p>
      <Tree items={items} />
    </div>
  )
}

function Tree({ items, level = 1 }: { items: TocItem[]; level?: number }) {
  return (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {items.map((item, index) => (
        <li key={index} className={cn("mt-2 first:mt-0")}>
          <Link
            href={`#${item.slug}`}
            className={cn(
              "inline-block no-underline transition-colors hover:text-foreground",
              "text-muted-foreground",
              {
                "text-sm": level > 2,
              }
            )}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}