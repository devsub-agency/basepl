import { allDocs } from 'contentlayer/generated'

interface NavItem {
  title: string
  href: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export function getNavigation() {
  const groups = allDocs.reduce<Record<string, NavItem[]>>((acc, doc) => {
    const [group] = doc.slugAsParams.split('/')
    if (!acc[group]) acc[group] = []
    
    acc[group].push({
      title: doc.title,
      href: doc.slug,
    })
    
    return acc
  }, {})

  return Object.entries(groups).map(([title, items]) => ({
    title,
    items
  }))
}