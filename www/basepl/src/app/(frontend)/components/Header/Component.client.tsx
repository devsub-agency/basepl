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
        'flex flex-col justify-between w-full gap-4 backdrop-blur-md bg-accent/50 md:rounded-lg md:flex-row md:px-4 md:py-2',
        { 'bg-background': showMenu },
      ])}
    >
      <div className="flex justify-between items-center w-full md:w-fit p-4 md:p-0">
        <BaseplLogo />
        <div onClick={() => setShowMenu(!showMenu)} className="md:hidden">
          {showMenu ? <X /> : <Menu />}
        </div>
      </div>
      <NavigationMenu className={cn([{ 'hidden sm:flex': !showMenu }])}>
        <NavigationMenuList className="flex flex-col md:flex-row items-start">
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={index !== 3 ? '/' : '/posts'}>
                <Button
                  variant="ghost"
                  className="hover:bg-transparent text-muted-foreground dark:hover:text-foreground"
                >
                  {item}
                  {index !== 3 && (
                    <div className="flex items-center space-x-2 rounded-full py-0.5 px-2 bg-emerald-500/20">
                      <span className="text-xs text-emerald-500">Soon</span>
                    </div>
                  )}
                </Button>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div
        className={cn([
          'flex justify-between items-center gap-4 p-4 md:p-0',
          { 'hidden sm:flex': !showMenu },
        ])}
      >
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={onToggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
            <Moon className="h-[1.2rem] w-[1.2rem] dark:hidden" />
          </Button>
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
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