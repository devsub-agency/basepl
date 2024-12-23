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
      <div className="mx-auto grid max-w-screen-xl flex-1 grid-cols-5 items-start px-5 md:px-8">
        <aside className="top-0 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-border/40 pt-32 md:sticky md:block">
          <DocsNav items={navigation} />
        </aside>
        <div className="col-span-5 pt-16 md:col-span-4 md:pt-24">
          {children}
        </div>
      </div>
    </>
  )
}
