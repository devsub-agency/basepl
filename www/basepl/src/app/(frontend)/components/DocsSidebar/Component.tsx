'use client'

import { getNavigation } from '@/lib/navigation'
import { DocsNav } from '@/components/simple-navigation'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
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
    <div className="sticky top-14 z-40 w-full border-y border-foreground/10 bg-background md:hidden">
      <div className="container h-14 flex items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu className="h-6 w-6" />
              Documentation
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-5">
            <SheetHeader className="text-left mb-4">
              <SheetTitle>Documentation</SheetTitle>
            </SheetHeader>
            <DocsNav items={navigation} setIsOpen={setIsOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
