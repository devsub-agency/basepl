import { allDocs } from 'contentlayer/generated'

interface NavItem {
  title: string
  href: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export function getNavigation(singleLayerGroupName?: string): NavGroup[] {
  const firstLayerGroup = singleLayerGroupName || 'Getting Started'
  const groups = allDocs.reduce<Record<string, NavItem[]>>((acc, doc) => {
    const group: string[] = doc.slugAsParams.split('/')
    if (group.length === 1) {
      if (!acc[firstLayerGroup]) acc[firstLayerGroup] = []
      acc[firstLayerGroup].push({
        title: doc.title,
        href: doc.slug,
      })
    } else {
      if (!acc[group[0]]) acc[group[0]] = []

      acc[group[0]].push({
        title: doc.title,
        href: doc.slug,
      })
    }

    return acc
  }, {})

  Object.values(groups).forEach(items => {
    items.sort((a, b) => a.title.localeCompare(b.title))
  })

  const gettingStarted = groups[firstLayerGroup]
    ? [{
      title: firstLayerGroup,
      items: groups[firstLayerGroup]
    }]
    : []

  delete groups[firstLayerGroup]

  // Sort remaining groups and combine with getting started
  const sortedGroups = Object.entries(groups)
    .sort(([titleA], [titleB]) => titleA.localeCompare(titleB))
    .map(([title, items]) => ({
      title,
      items
    }))

  return [...gettingStarted, ...sortedGroups]
}