'use client'

import { NavGroup } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Book,
  Image,
  MousePointerClickIcon,
  Rocket,
  Video,
  Text,
  Type,
  Link as LinkIcon,
  LayoutPanelTop,
} from 'lucide-react'

interface DocsNavProps {
  items: NavGroup[]
  setIsOpen?: (isOpen: boolean) => void
}

const iconsMap = {
  'getting-started': <Rocket className="size-5" />,
  button: <MousePointerClickIcon className="size-5" />,
  about: <Book className="size-5" />,
  image: <Image className="size-5" />,
  video: <Video className="size-5" />,
  richtext: <Text className="size-5" />,
  label: <Type className="size-5" />,
  link: <LinkIcon className="size-5" />,
  start: <LayoutPanelTop className="size-5" />,
}

export function DocsNav({ items, setIsOpen }: DocsNavProps) {
  const pathname = usePathname()

  const getLastPath = (href: string) => {
    const parts = href.split('/')
    return parts[parts.length - 1]
  }

  const firstLetterToUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="w-full space-y-4 pr-2">
      {items.map((group) => (
        <div key={group.title}>
          <span className="block pb-2 text-sm font-medium text-foreground/80">
            {firstLetterToUpperCase(group.title)}
          </span>
          <div className="flex flex-col pb-2">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen?.(false)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground',
                  'border-l hover:bg-emerald-500/5 hover:text-foreground',
                  {
                    'border-emerald-500 font-medium text-emerald-500 dark:text-emerald-400':
                      pathname === item.href,
                  },
                )}
              >
                {(iconsMap as any)[getLastPath(item.href)] || (
                  <Book className="size-5" />
                )}
                {firstLetterToUpperCase(item.title)}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
