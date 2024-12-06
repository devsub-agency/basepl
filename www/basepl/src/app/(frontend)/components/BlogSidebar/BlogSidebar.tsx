'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu, TableOfContentsIcon } from 'lucide-react'
import Link from 'next/link'

interface TableOfContentsItem {
  href: string
  title: string
  subitems?: TableOfContentsItem[]
}

const tableOfContents: TableOfContentsItem[] = [
  {
    href: '#the-challenge-we-faced',
    title: 'The challenge we faced',
  },
  {
    href: '#keep-the-beauty',
    title: 'Keep the beauty ',
  },
  {
    href: '#what-is-basepl',
    title: 'What is basepl?',
    subitems: [
      {
        href: '#scalable-templates',
        title: 'Scalable templates',
      },
      {
        href: '#components-via-CL-commands',
        title: 'Components via CL commands',
      },
      {
        href: '#a-directory-for-plugins',
        title: 'A directory for plugins',
      },
    ],
  },
  {
    href: '#establish-a-better-cms',
    title: 'establish a better CMS',
  },
]

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

interface BlogSidebarProps {
  tableOfContents: TableOfContentsItem[]
}

export const BlogSidebar = () => {
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
              <SheetTitle>{tableOfContentsHeadline}</SheetTitle>
            </SheetHeader>
            <TableOfContents items={tableOfContents} className="mt-8" />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export { tableOfContents }
