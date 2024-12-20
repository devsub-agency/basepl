'use client'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { GithubLogo } from '../Logos/GithubLogo'
import { BaseplLogo } from '../Logos/BaseplLogo'

interface HeaderClientProps {
  // todo: needs to be replaced with payload data
  menuItems: string[]
}
export const HeaderClient = ({ menuItems }: HeaderClientProps) => {
  const { theme, setTheme } = useTheme()
  const [showMenu, setShowMenu] = useState(false)
  const mockCta = 'Get started'

  const onToggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div
      className={cn([
        'flex w-full flex-col justify-between gap-4 bg-background md:flex-row md:rounded-lg md:bg-accent/60 md:px-4 md:py-2 md:backdrop-blur-md md:dark:bg-accent/30',
        { 'bg-background': showMenu },
      ])}
    >
      <div className="flex w-full items-center justify-between p-4 md:w-fit md:p-0">
        <BaseplLogo />
        <div onClick={() => setShowMenu(!showMenu)} className="md:hidden">
          {showMenu ? <X /> : <Menu />}
        </div>
      </div>
      <NavigationMenu className={cn([{ 'hidden sm:flex': !showMenu }])}>
        <NavigationMenuList className="flex flex-col items-start md:flex-row">
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={index !== 3 ? '/' : '/posts'}>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:bg-transparent dark:hover:text-foreground"
                >
                  {item}
                </Button>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div
        className={cn([
          'flex items-center justify-between gap-4 p-4 md:p-0',
          { 'hidden sm:flex': !showMenu },
        ])}
      >
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={onToggleTheme}>
            <Sun className="hidden h-[1.2rem] w-[1.2rem] dark:block" />
            <Moon className="h-[1.2rem] w-[1.2rem] dark:hidden" />
          </Button>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <GithubLogo />
            </Button>
          </Link>
        </div>
        <Link href="/">
          <Button variant="default" className="h-8 rounded-lg">
            {mockCta}
          </Button>
        </Link>
      </div>
    </div>
  )
}
