'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { TableOfContentsIcon, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'

interface TableOfContentsItem {
  href: string
  title: string
  subitems?: TableOfContentsItem[]
}

interface TableOfContentsProps {
  items: TableOfContentsItem[]
  className?: string
}

const TableOfContents = ({ items, className }: TableOfContentsProps) => (
  <nav className={className}>
    {items.map((item) => (
      <div key={item.href}>
        <Link href={item.href} className="block text-foreground hover:text-foreground pt-4">
          {item.title}
        </Link>
        {item.subitems && (
          <div className="pl-4 space-y-3 border-l pt-3">
            {item.subitems.map((subitem) => (
              <Link
                key={subitem.href}
                href={subitem.href}
                className="block text-muted-foreground hover:text-foreground"
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

export const BlogSidebar = () => {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([])

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('#blogContent h2, #blogContent h3'))
    const tocItems: TableOfContentsItem[] = []

    headings.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-')
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
    <div className="flex gap-2 items-center mb-4">
      <TableOfContentsIcon />
      <span className="text-lg font-semibold">Table of contents</span>
    </div>
  )

  return (
    <>
      <div className="hidden lg:block">
        <div className="sticky top-8">
          {tableOfContentsHeadline}
          <TableOfContents items={tableOfContents} />
        </div>
      </div>
      <div className="fixed bottom-6 right-6 lg:hidden z-50 lg:max-w-[320px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="h-12 w-12 rounded-full bg-emerald-500">
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
