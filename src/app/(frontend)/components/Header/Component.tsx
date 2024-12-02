import * as React from 'react'
import HeaderClient from './Component.client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '../Logo/Componet'

const mockDate = ['Templates', 'Modules', 'Plugins', 'Blog']
const mockCta = 'Get started'

const Header = () => {
  return (
    <header className="fixed left-0 right-0 mx-auto w-full max-w-screen-xl sm:px-8 sm:top-4">
      <div className="flex items-center gap-4 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-lg">
        <Logo />
        <HeaderClient menuItems={mockDate} />
        <Link href="/">
          <Button variant="default" className="h-8 rounded-lg">
            {mockCta}
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default Header
