'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'

interface TableOfContentsItem {
  href: string
  title: string
  subitems?: TableOfContentsItem[]
}

const tableOfContents: TableOfContentsItem[] = [
  {
    href: '#introduction',
    title: 'Introduction',
    subitems: [
      {
        href: '#getting-started',
        title: 'Getting Started',
      },
      {
        href: '#prerequisites',
        title: 'Prerequisites',
      },
    ],
  },
  {
    href: '#main-concepts',
    title: 'Main Concepts',
    subitems: [
      {
        href: '#basics',
        title: 'Basics',
      },
      {
        href: '#advanced',
        title: 'Advanced',
      },
    ],
  },
]

interface TableOfContentsProps {
  items: TableOfContentsItem[]
  className?: string
}

const TableOfContents = ({ items, className }: TableOfContentsProps) => (
  <nav className={`space-y-4 ${className}`}>
    {items.map((item) => (
      <div key={item.href}>
        <Link href={item.href} className="block text-foreground hover:text-foreground pb-3">
          {item.title}
        </Link>
        {item.subitems && (
          <div className="pl-4 space-y-3 border-l">
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

interface BlogSidebarProps {
  tableOfContents: TableOfContentsItem[]
}

export const BlogSidebar = () => {
  return (
    <>
      <div className="hidden lg:block">
        <div className="sticky top-8">
          <h2 className="mb-4 text-lg font-semibold">INSIDE THIS ARTICLE</h2>
          <TableOfContents items={tableOfContents} />
        </div>
      </div>

      <div className="fixed bottom-6 right-6 lg:hidden z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full bg-emerald-500"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Content Overview</SheetTitle>
            </SheetHeader>
            <TableOfContents items={tableOfContents} className="mt-8" />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export { tableOfContents }
