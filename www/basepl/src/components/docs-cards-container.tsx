import { cn } from '@/lib/utils'
import { Cuboid, LayoutPanelTop, RectangleHorizontal } from 'lucide-react'
import Link from 'next/link'

const iconsMap = {
  block: <Cuboid className="size-5 text-emerald-500 dark:text-emerald-400" />,
  field: (
    <RectangleHorizontal className="size-5 text-emerald-500 dark:text-emerald-400" />
  ),
  template: (
    <LayoutPanelTop className="size-5 text-emerald-500 dark:text-emerald-400" />
  ),
}

interface Card {
  title: string
  link: string
  icon: keyof typeof iconsMap
}

export const DocsCardsContainer = () => {
  const cards: Card[] = [
    { title: 'Blocks -> Button', link: '/docs/blocks/button', icon: 'block' },
    { title: 'Fields -> Link', link: '/docs/fields/link', icon: 'field' },
    {
      title: 'Templates -> Start',
      link: '/docs/templates/start',
      icon: 'template',
    },
  ]

  return (
    <div className="mp-8 mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card, index) => (
        <Link
          key={index}
          href={card.link}
          className={cn(
            'group flex items-center gap-4 rounded-lg border p-4',
            'border-emerald-500/20',
            'bg-emerald-500/10',
          )}
        >
          <div>{iconsMap[card.icon]}</div>
          <p
            className={cn(
              'text-emerald-700 group-hover:underline dark:text-emerald-200',
            )}
          >
            {card.title}
          </p>
        </Link>
      ))}
    </div>
  )
}
