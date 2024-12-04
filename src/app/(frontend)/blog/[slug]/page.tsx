import { Button } from '@/components/ui/button'
import { ChevronRight, Clock, Menu, MessageSquare, Sheet } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next/types'
import React from 'react'
import Image from 'next/image'
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { BlogSidebar } from '../../components/BlogSidebar/BlogSidebar'

export const dynamic = 'force-static'
export const revalidate = 600

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
              <h1 className="mb-4 text-3xl font-medium tracking-tight w-3/4">
                basepl - An open source library based on Payload CMS to build faster
              </h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <time dateTime="2024-11-14">Nov 14, 2024</time>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>4 min read</span>
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
              <h2 className="text-2xl font-semibold"> Test headline</h2>
              <br />
              <p className="text-muted-foreground">
                We all suffer from documentation lagging behind product updates. Its a particularly
                hard problem because developers should own documentation since they know the details
                best, but they often hesitate to use tools outside their familiar git workflows or
                IDEs.
              </p>
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
    title: `plbase Posts`,
  }
}
