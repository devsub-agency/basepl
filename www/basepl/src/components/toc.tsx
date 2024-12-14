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
  if (!raw) return []

  // Handle different newline formats and clean the string
  const cleanedRaw = raw.replace(/\r\n/g, '\n').trim()

  const headingLines = cleanedRaw
    .split('\n')
    .filter(line => line.match(/^#{2,6}\s+/)) // Added + to ensure at least one space

  return headingLines
    .map((line) => {
      // Improved regex to handle more heading formats
      const match = line.match(/^(#{2,6})\s*(.+?)\s*$/)
      if (!match) {
        console.log('No match for line:', line)
        return null
      }

      const [, hashes, title] = match
      const level = hashes.length

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-') // Handle multiple dashes
        .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes

      return {
        level,
        title: title.trim(),
        slug,
      }
    })
    .filter((item): item is TocItem => Boolean(item))
}

export function TableOfContents({ rawBody, className }: TocProps) {
  const [activeItem, setActiveItem] = React.useState<string>("")
  const itemsRef = React.useRef<HTMLElement[]>([])

  const items = React.useMemo(() => getTableOfContents(rawBody), [rawBody])

  React.useEffect(() => {
    if (!items.length) return

    itemsRef.current = items.map(item =>
      document.getElementById(item.slug)
    ).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveItem(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 1.0
      }
    )

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item)
      })
    }
  }, [items])

  if (!items?.length) return null

  return (
    <div className={cn("space-y-2", className)}>
      <p className="font-medium">On This Page</p>
      <Tree items={items} activeItem={activeItem} />
    </div>
  )
}

function Tree({
  items,
  level = 1,
  activeItem
}: {
  items: TocItem[]
  level?: number
  activeItem: string
}) {
  return (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {items.map((item, index) => (
        <li key={index} className={cn("mt-2 first:mt-0")}>
          <Link
            href={`#${item.slug}`}
            className={cn(
              "inline-block no-underline transition-colors hover:text-foreground",
              {
                "text-muted-foreground": item.slug !== activeItem,
                "font-medium text-foreground": item.slug === activeItem,
                "text-sm": level > 2,
              }
            )}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.slug)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              })
            }}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
