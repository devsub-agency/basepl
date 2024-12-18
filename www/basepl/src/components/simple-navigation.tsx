'use client'

import { NavGroup } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DocsNavProps {
  items: NavGroup[]
  setIsOpen?: (isOpen: boolean) => void
}

export function DocsNav({ items, setIsOpen }: DocsNavProps) {
  const pathname = usePathname()

  return (
    <div className="w-full">
      {items.map((group) => (
        <div key={group.title} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {group.title.toUpperCase()}
          </h4>
          <div className="grid grid-flow-row auto-rows-max text-sm">
            {group.items.map((item) => (
              <Link
                onClick={() => setIsOpen?.(false)}
                key={item.href}
                href={item.href}
                className={cn(
                  'flex w-full items-center rounded-md p-2 hover:underline',
                  'text-muted-foreground',
                  pathname === item.href && 'font-medium text-foreground',
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
