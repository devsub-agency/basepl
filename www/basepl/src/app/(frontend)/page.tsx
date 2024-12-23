import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

import { Separator } from '@/components/ui/separator'
import { GitPullRequest, LayoutPanelTop, Package, Plug } from 'lucide-react'
import { SparklesCore } from '@/components/ui/sparkles'
import { PayloadLogo } from './components/Logos/PayloadLogo'
import { NextjsLogo } from './components/Logos/NextJsLogo'
import { RadixLogo } from './components/Logos/RadixLogo'
import { TailwindLogo } from './components/Logos/TailwindLogo'
import { DiscordLogo } from './components/Logos/DiscordLogo'
import { Metadata } from 'next'

const Home = () => {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col sm:px-8">
      <div className="mx-auto flex h-screen flex-col justify-center">
        <div className="z-10 mx-auto flex flex-col gap-6 px-5 pb-40 pt-20 sm:text-center md:w-3/5 md:px-10">
          <h1 className="text-4xl font-medium leading-[1.125] tracking-tight md:text-6xl">
            Build your Payload applications in minutes
          </h1>
          <p className="text-lg text-muted-foreground">
            Awesome out-of-the-box templates, components and plugins for Payload
            CMS. Bootstrap your next project in minutes with ease.
          </p>
          <div className="flex gap-4 sm:mx-auto">
            <Button
              variant="outline"
              asChild
              className="border-muted-foreground bg-transparent"
            >
              <Link href="/#discord">Support us</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/docs/getting-started">Get started</Link>
            </Button>
          </div>
        </div>
        <Image
          src="/bg-pattern.png"
          alt="logo"
          width={1000}
          height={1000}
          className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover object-bottom opacity-80 dark:opacity-20"
          priority
        />
      </div>
      <div className="mx-auto flex flex-col gap-4 px-5 md:w-3/5 md:px-10 md:pb-12 md:text-center">
        <h1 className="text-3xl font-medium leading-[1.125] tracking-tight md:text-4xl">
          Fast forward your project
        </h1>
        <p className="text-muted-foreground md:px-12">
          An open source library built on top of Payload CMS and technologies
          you know and trust.
        </p>
        <div className="grid w-full grid-cols-4 items-center gap-4 opacity-80 md:mt-6 md:gap-8 md:px-6">
          <PayloadLogo />
          <NextjsLogo />
          <RadixLogo />
          <TailwindLogo />
        </div>
      </div>
      <div className="my-12 flex flex-col px-5 md:px-0">
        <Separator />
        <div className="grid w-4/5 gap-12 py-12 md:w-full md:grid-cols-4 md:gap-8">
          <div className="space-y-2">
            <div className="flex gap-2">
              <LayoutPanelTop />
              <h2 className="mb-0 text-lg font-medium">Templates</h2>
            </div>
            <p className="text-muted-foreground">
              Find starter kits for e-commerce, websites and more to suit your
              needs.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Package />
              <h2 className="mb-0 text-lg font-medium">Blocks & Components</h2>
            </div>
            <p className="text-muted-foreground">
              Install pre-built components, panels and blocks directly from your
              console.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Plug />
              <h2 className="mb-0 text-lg font-medium">Plugins</h2>
            </div>
            <p className="text-muted-foreground">
              A rich set of plug-ins to extend the applications to meet your or
              your customers needs.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <GitPullRequest />
              <h2 className="mb-0 text-lg font-medium">Open Source</h2>
            </div>
            <p className="text-muted-foreground">
              A transparent and community-driven open source library built on
              top of Payload CMS.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden h-40 md:block" />
      <div className="mx-auto flex flex-col gap-4 px-5 md:w-3/5 md:text-center">
        <h1 className="text-3xl font-medium leading-[1.125] tracking-tight md:text-4xl">
          Join the basepl community
        </h1>
        <p className="text-muted-foreground md:px-12">
          Join our discord server to share feedback, help, showcase your
          projects or get the latest updates for basepl. Let&apos;s build
          something awesome together.
        </p>
        <Button type="submit" className="mt-4 md:mx-auto" id="discord" asChild>
          <Link href="https://discord.gg/b99KZMW2">
            <DiscordLogo isNative={false} />
            Join on Discord
          </Link>
        </Button>
        <div className="relative mx-auto mt-4 h-40 w-full max-w-[40rem] px-5">
          <div className="absolute inset-x-20 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent blur-sm md:w-3/4" />
          <div className="absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent md:w-3/4" />
          <div className="absolute inset-x-60 top-0 h-[5px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-sm md:w-1/4" />
          <div className="absolute inset-x-60 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent md:w-1/4" />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="h-full w-full bg-transparent"
            particleColor="#34d399"
          />
          <div className="absolute inset-0 h-full w-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
      <div className="hidden h-32 md:block" />
    </div>
  )
}

export default Home

export function generateMetadata(): Metadata {
  return {
    title: `basepl - Build your Payload applications in minutes`,
    description:
      'Awesome out-of-the-box templates, components and plugins for Payload CMS. Bootstrap your next project in minutes with ease.',
    authors: [{ name: 'Maurice Ihl' }],
    openGraph: {
      images: [{ url: '/basepl-logo.png' }],
    },
  }
}
