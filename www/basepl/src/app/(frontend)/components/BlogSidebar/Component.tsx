'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { TableOfContentsIcon, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TableOfContentsItem {
  href: string
  title: string
  subitems?: TableOfContentsItem[]
}

interface TableOfContentsProps {
  items: TableOfContentsItem[]
  className?: string
}

const TableOfContents = ({ items, className }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' },
    )

    const headings = document.querySelectorAll('h2, h3')
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  const getLinkClassName = (href: string) => {
    return cn('text-sm text-muted-foreground hover:text-foreground py-2', {
      'text-emerald-500 font-medium': activeId === href.replace('#', ''),
    })
  }

  return (
    <nav className={className}>
      {items.map((item) => (
        <div key={item.href} className="flex flex-col">
          <Link href={item.href} className={getLinkClassName(item.href)}>
            {item.title}
          </Link>
          {item.subitems && (
            <div className="flex flex-col border-l px-5">
              {item.subitems.map((subitem) => (
                <Link
                  key={subitem.href}
                  href={subitem.href}
                  className={getLinkClassName(subitem.href)}
                >
                  {subitem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

export const BlogSidebar = () => {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>(
    [],
  )

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'))
    const tocItems: TableOfContentsItem[] = []

    headings.forEach((heading) => {
      const id =
        heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-')
      if (id) {
        heading.id = id
        const item: TableOfContentsItem = {
          href: `#${id}`,
          title: heading.textContent || '',
        }
        if (heading.tagName.toLowerCase() === 'h3') {
          const lastItem = tocItems[tocItems.length - 1]
          if (lastItem) {
            lastItem.subitems = lastItem.subitems || []
            lastItem.subitems.push(item)
          }
        } else {
          tocItems.push(item)
        }
      }
    })

    setTableOfContents(tocItems)
  }, [])

  const tableOfContentsHeadline = (
    <div className="mb-4 flex items-center gap-2">
      <TableOfContentsIcon className="h-5 w-5" />
      <span className="font-semibold text-foreground/80">
        Table of contents
      </span>
    </div>
  )

  return (
    <>
      <div className="relative hidden max-w-80 lg:block">
        <div className="sticky top-32">
          {tableOfContentsHeadline}
          <TableOfContents items={tableOfContents} />
        </div>
      </div>
      <div className="fixed bottom-6 right-6 z-50 lg:hidden lg:max-w-[320px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-emerald-500"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{tableOfContentsHeadline}</SheetTitle>
            </SheetHeader>
            <TableOfContents items={tableOfContents} className="mt-8" />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
