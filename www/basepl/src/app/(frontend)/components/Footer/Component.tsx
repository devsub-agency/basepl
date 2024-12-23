'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { YoutubeLogo } from '../Logos/YoutubeLogo'
import { GithubLogo } from '../Logos/GithubLogo'
import { XLogo } from '../Logos/XLogo'
import { BaseplLogo } from '../Logos/BaseplLogo'
import { DiscordLogo } from '../Logos/DiscordLogo'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      className={cn('z-0 w-full border-t bg-background', className)}
      {...props}
    >
      <div className="mx-auto max-w-screen-xl md:px-5">
        <div className="grid grid-cols-2 gap-8 px-5 py-10 md:grid-cols-4 md:border-x md:p-16 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col justify-between lg:col-span-1">
            <div className="flex items-center space-x-4">
              <BaseplLogo />
              <span className="text-muted-foreground">v0.1 &alpha;lpha</span>
            </div>
            <div className="mt-8 flex">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://x.com/maurice_build" target="_blank">
                  <XLogo />
                  <span className="sr-only">X</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://discord.gg/b99KZMW2" target="_blank">
                  <DiscordLogo />
                  <span className="sr-only">Discord</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="https://github.com/devsub-agency/basepl"
                  target="_blank"
                >
                  <GithubLogo />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/" target="_blank">
                  <YoutubeLogo />
                  <span className="sr-only">Youtube</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block" />
          <div className="flex flex-col space-y-4">
            <span className="text-sm font-medium">Pages</span>
            <nav className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <Link href="/">Home</Link>
              <Link href="/docs/getting-started">Documentation</Link>
              <Link href="/posts">Blog</Link>
            </nav>
          </div>
          <div className="flex flex-col space-y-4">
            <span className="text-sm font-medium">Resources</span>
            <nav className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <Link href="/docs/blocks/button">Blocks</Link>
              <Link href="/docs/fields/link">Fields</Link>
              <Link href="/docs/templates/start">Templates</Link>
            </nav>
          </div>
          <div className="flex flex-col space-y-4">
            <span className="text-sm font-medium">Legal</span>
            <nav className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <Link href="/">Privacy policy</Link>
              <Link href="https://devsub.de" target="_blank">
                devsub company
              </Link>
            </nav>
          </div>

          <div className="col-span-2 mt-12 flex items-center justify-between space-x-4 text-sm text-muted-foreground opacity-75 md:col-span-5">
            <div className="flex items-center space-x-2 rounded-full border px-3 py-1">
              <div className="relative h-[0.5rem] w-[0.5rem] rounded-full bg-emerald-500">
                <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-emerald-400 opacity-75" />
              </div>
              <span>In progress</span>
            </div>
            <span>Support us ❤</span>
            <span>2024 basepl</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
