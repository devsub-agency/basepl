import * as React from 'react'
import { HeaderClient } from './Component.client'

const mockDate = ['Templates', 'Components','Blog']

const Header = () => {
  return (
    <header className="fixed left-0 right-0 mx-auto w-full max-w-screen-xl sm:px-8 md:top-4 z-50">
      <HeaderClient menuItems={mockDate} />
    </header>
  )
}

export default Header
