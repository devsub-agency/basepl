import * as React from 'react'
import { HeaderClient } from './Component.client'

const mockDate = [
  { title: 'Documentation', href: '/docs/getting-started' },
  { title: 'Blog', href: '/posts' },
]

const Header = () => {
  return (
    <header className="fixed left-0 right-0 z-50 mx-auto w-full max-w-screen-xl sm:px-8 md:top-4">
      <HeaderClient menuItems={mockDate} />
    </header>
  )
}

export default Header
