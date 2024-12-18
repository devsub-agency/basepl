'use client'

import { getNavigation } from '@/lib/navigation'
import { DocsNav } from '@/components/simple-navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'

interface DocSidebarProps {
  children: React.ReactNode
}

export default function DocSidebar({ children }: DocSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = getNavigation()

  return (
    <div className="sticky top-12 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="container h-14 flex items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <nav className="flex flex-col space-y-3 pt-6">
              <DocsNav items={navigation} setIsOpen={setIsOpen} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
