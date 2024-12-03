'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { YoutubeLogo } from '../Logos/YoutubeLogo'
import { GithubLogo } from '../Logos/GithubLogo'
import { LinkedinLogo } from '../Logos/LinkedInLogo'
import { XLogo } from '../Logos/XLogo'
import { Logo } from '../Logo/Componet'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer className={cn('w-full border-t bg-background', className)} {...props}>
      <div className="mx-auto max-w-screen-xl md:px-5">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 px-5 py-10 md:border-x md:p-16">
          <div className="flex flex-col justify-between col-span-2 lg:col-span-1">
            <Logo />
            <div className="flex mt-8">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com">
                  <XLogo />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com">
                  <LinkedinLogo />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com">
                  <GithubLogo />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://youtube.com">
                  <YoutubeLogo />
                  <span className="sr-only">Youtube</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block" />
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium">Resources</h3>
            <nav className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <Link href="/templates">Templates</Link>
              <Link href="/components">Components</Link>
              <Link href="/plugins">Plugins</Link>
            </nav>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <nav className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <Link href="/blog">Blog</Link>
              <Link href="https://devsub.de">devsub</Link>
            </nav>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <nav className="flex flex-col space-y-3 text-sm text-muted-foreground">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </nav>
          </div>

          <div className="flex justify-between items-center space-x-4 text-sm text-muted-foreground mt-12 opacity-75 col-span-2 md:col-span-5">
            <div className="flex items-center space-x-2 border rounded-full py-1 px-3">
              <div className="relative  h-[0.5rem] w-[0.5rem] rounded-full bg-emerald-500 ">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              </div>
              <span>In progress</span>
            </div>
            <span>Support us ❤</span>
            <span>2024 plbase</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
