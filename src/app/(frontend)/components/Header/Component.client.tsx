'use client'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Github } from '../Socials/Github'

interface HeaderClientProps {
  // todo: needs to be replaced with payload data
  menuItems: string[]
}
const HeaderClient = ({ menuItems }: HeaderClientProps) => {
  const { theme, setTheme } = useTheme()

  const onToggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div className="flex justify-between items-center w-full">
      <div />
      <NavigationMenu>
        <NavigationMenuList>
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="hover:bg-transparent text-gray-500 dark:text-gray-400 dark:hover:text-foreground"
                >
                  {item}
                </Button>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex">
        <Button variant="ghost" size="icon" onClick={onToggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:-rotate-90 dark:scale-100 hidden dark:block" />
          <Moon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:rotate-0 dark:scale-0 dark:hidden" />
        </Button>
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon">
            <Github />
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default HeaderClient
