'use client'

import { getNavigation } from '@/lib/navigation'
import { DocsNav } from '@/components/simple-navigation'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export default function DocSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = getNavigation()

  return (
    <div className="border-foreground/10 bg-background sticky top-14 z-40 w-full border-y md:hidden">
      <div className="container flex h-14 items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu className="size-6" />
              Documentation
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-5">
            <SheetHeader className="mb-4 text-left">
              <SheetTitle>Documentation</SheetTitle>
            </SheetHeader>
            <DocsNav items={navigation} setIsOpen={setIsOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
