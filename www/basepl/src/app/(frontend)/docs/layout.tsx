import { getNavigation } from '@/lib/navigation'
import { DocsNav } from '@/components/simple-navigation'
import DocSidebar from '../components/DocsSidebar/Component'

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const navigation = getNavigation()
  return (
    <>
      <DocSidebar children={children} />
      <div className="mx-auto max-w-screen-xl flex-1 items-start grid grid-cols-5 px-5 md:px-8">
        <aside className="top-0 h-[calc(100vh-3.5rem)] w-full shrink-0 border-r border-border/40 md:sticky hidden md:block overflow-y-auto pt-32">
          <DocsNav items={navigation} />
        </aside>
        <div className="col-span-5 md:col-span-4 pt-24">{children}</div>
      </div>
    </>
  )
}
