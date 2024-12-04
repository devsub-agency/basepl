import { Clock } from 'lucide-react'
import type { Metadata } from 'next/types'
import React from 'react'
import Image from 'next/image'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { BlogSidebar } from '../../components/BlogSidebar/BlogSidebar'
import { Button } from '@/components/ui/button'
import { DiscordLogo } from '../../components/Logos/DiscordLogo'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600
const featuredArticle = {
  title: 'The vision behind basepl',
  description:
    'Get a quick overview of our vision for the open-source library basepl and how it can help you building applications with payload cms faster.',
  image: '/article-thumbnail.png',
  date: '04 December, 2024',
  readTime: '2 min read',
  author: {
    name: 'Maurice',
    role: 'Co-founder',
    image: '/pb-maurice.png',
  },
  slug: 'what-is-basepl',
}

export default async function Page() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-screen-xl px-4 py-8 px-5 md:px-8 pt-20 pb-10 md:pt-40 md:pb-16">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog/seo">Introducing basepl</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="mb-4 text-3xl font-medium tracking-tight md:w-3/4">
                basepl - An OS library based on Payload CMS to build faster
              </h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <time dateTime="2024-11-14">Dec 04, 2024</time>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>2 min read</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8 overflow-hidden rounded-xl">
              <Image
                src="/article-thumbnail.png"
                alt="Google Core Update"
                width={800}
                height={400}
                className="aspect-[2/1] w-full object-cover"
              />
            </div>
            <article>
              <br />
              <h2 className="text-2xl font-semibold" id="the-challenge-we-faced">
                The challenge we faced
              </h2>
              <p className="text-muted-foreground mt-2">
                We have fallen in love working with Payload CMS for both our own projects and those
                of our customers. The freedom to create a highly customisable and individual CMS for
                your projects combined with the flexibility of an open source tool is simply
                fantastic. As an agency owner and developer, I can tell you that it's important to
                be comfortable with the framework you're working with. But individualism always
                comes with a trade-off...
              </p>
              <br />
              <br />
              <h2 className="text-2xl font-semibold" id="keep-the-beauty">
                Keep the beauty but be more efficient
              </h2>
              <p className="text-muted-foreground mt-2">
                Creating customised applications, websites and shops that are exactly what you need
                is great, but often time-consuming. Either you start from scratch (absolutely not
                recommended to do that) or you build back stuff from the current existing templates.
                Sure, if you have already built some projects, you can copy and paste code. But this
                is by no means a standardised and scalable solution. So we asked our team how we
                could keep the beauty of using a flexible CMS like Payload, but be more efficient
                with it. A good, familiar library came to mind - shadcn. That's how the idea for
                basepl was born.
              </p>
              <br />
              <br />
              <h2 className="text-2xl font-semibold" id="what-is-basepl">
                What is basepl?
              </h2>
              <p className="text-muted-foreground mt-2">
                basepl is an open source library built on top of Payload CMS. It is designed to
                provide a set of templates and pre-built components that you can easily use and
                install from the command line. In addition, basepl provides a directory of plugins
                that you can use. You can also submit your own plugins to be featured on basepl.
              </p>
              <br />
              <h3 className="text-lg font-semibold" id="scalable-templates">
                Scalable templates
              </h3>
              <p className="text-muted-foreground mt-2">
                Yes, payload itself already provides them, but they don't meet our needs. So we want
                to provide starterkits for simple landing pages, websites, blogs, e-commerce stores
                and maybe in the future for apps and platforms. And best of all, the templates are
                easy to combine with the components.
              </p>
              <br />
              <h3 className="text-lg font-semibold" id="components-via-CL-commands">
                Components via CL commands
              </h3>
              <p className="text-muted-foreground mt-2">
                The beauty of libraries like shadcn are the easy-to-use commands. So we thought we
                needed to do that for Basepl as well. Just install new blocks or whole components
                with a command in your CL. You can choose to install only fields, collections and
                blocks, or use ready-made components styled with shadcn instead.
              </p>
              <br />
              <h3 className="text-lg font-semibold" id="a-directory-for-plugins">
                A directory for plugins
              </h3>
              <p className="text-muted-foreground mt-2">
                Plugins are a great way to create solutions on top of Payload CMS. Compared to
                plugin marketplaces like Wordpress, there is a lot of catching up to do. That is why
                we want to give developers the opportunity to create their own plugins and present
                them in one place.
              </p>
              <br />
              <br />
              <h2 className="text-2xl font-semibold" id="establish-a-better-cms">
                Let's establish a better CMS together
              </h2>
              <p className="text-muted-foreground mt-2">
                You have probably read this far because you like the CMS Payload and are a bit
                hooked by to the vision. Together, we can create a new standard for web applications
                and move these great tools forward. If you have any questions, ideas or suggestions
                feel free to join us on discord or contact me on X. We would love to have your
                support.
              </p>
              <div className="flex justify-between items-center w-full md:mx-auto mt-8 md:mt-16">
                <div className="flex items-center space-x-3">
                  <Image
                    src={featuredArticle.author.image}
                    alt={featuredArticle.author.name}
                    width={40}
                    height={40}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground">
                      {featuredArticle.author.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {featuredArticle.author.role}
                    </div>
                  </div>
                </div>
                <Button type="submit" id="discord" asChild>
                  <Link href="https://discord.gg/b99KZMW2">
                    <DiscordLogo isNative={false} />
                    Join on Discord
                  </Link>
                </Button>
              </div>
            </article>
          </div>
          <BlogSidebar />
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Introducing basepl - Open source library based on Payload CMS`,
    description:
      'An overview and quick introduction to the open source library basepl and how it can help you build applications with Payload CMS.',
    authors: [{ name: 'Maurice Ihl' }],
    openGraph: {
      images: [{ url: '/article-thumbnail.png' }],
    },
  }
}
