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
} from 'lucide-react'

interface DocsNavProps {
  items: NavGroup[]
  setIsOpen?: (isOpen: boolean) => void
}

const iconsMap = {
  'getting-started': <Rocket className="h-5 w-5" />,
  button: <MousePointerClickIcon className="h-5 w-5" />,
  about: <Book className="h-5 w-5 " />,
  image: <Image className="h-5 w-5" />,
  video: <Video className="h-5 w-5" />,
  richtext: <Text className="h-5 w-5" />,
  label: <Type className="h-5 w-5" />,
  link: <LinkIcon className="h-5 w-5" />,
}

export function DocsNav({ items, setIsOpen }: DocsNavProps) {
  const pathname = usePathname()

  const getLastPath = (href: string) => {
    const parts = href.split('/')
    return parts[parts.length - 1]
  }

  return (
    <div className="w-full space-y-4 pr-2 text-sm">
      {items.map((group) => (
        <div key={group.title}>
          <h4 className="py-2 text-sm font-semibold text-foreground/80">{group.title}</h4>
          <div className="flex flex-col">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen?.(false)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2 text-muted-foreground ',
                  'hover:text-foreground border-l hover:bg-emerald-500/5',
                  {
                    'border-emerald-500 text-emerald-500 dark:text-emerald-400 font-medium':
                      pathname === item.href,
                  },
                )}
              >
                {(iconsMap as any)[getLastPath(item.href)] || <Book />}
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
