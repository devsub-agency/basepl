import type { Metadata } from 'next/types'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface Author {
  name: string
  image: string
  role: string
  date: string
}

interface Article {
  title: string
  description: string
  image: string
  author: Author
  badge?: string
  slug: string
}

export default function Page() {
  const featuredArticle = {
    title: 'Introducing AI Assistant',
    description: 'Ask AI to make context-aware changes to your docs.',
    image: '/bg-pattern.png',
    date: 'November 25, 2024',
    readTime: '1 min read',
    author: {
      name: 'Han Wang',
      role: 'Co-founder',
      image: '/bg-pattern.png',
    },
    slug: 'introducing-ai-assistant',
  }

  const articles: Article[] = [
    {
      title: 'Simplifying docs for AI with /llms.txt',
      description: "Why we're providing a better way for LLMs to process documentation.",
      image: '/bg-pattern.png',
      author: {
        name: 'Tiffany Chen',
        image: '/bg-pattern.png',
        role: '',
        date: 'November 20, 2024',
      },
      slug: 'simplifying-docs-for-ai',
    },
  ]

  return (
    <div className="bg-background">
      <main className="mx-auto max-w-screen-xl px-5 md:px-8 pt-20 pb-10 md:pt-40 md:pb-16">
        <Link href={`/blog/${featuredArticle.slug}`} className="mb-16 grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              fill
              className="object-cover md:h-64"
              priority
            />
            <div className="absolute left-4 top-4">
              <Badge variant="secondary" className="bg-white/10 text-white backdrop-blur-sm">
                NEW
              </Badge>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground mb-4">
                {featuredArticle.date} • {featuredArticle.readTime}
              </div>
              <h1 className="text-2xl font-medium lg:text-3xl">{featuredArticle.title}</h1>
              <p className="text-muted-foreground">{featuredArticle.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Image
                src={featuredArticle.author.image}
                alt={featuredArticle.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="text-sm font-semibold text-muted-foreground">
                  {featuredArticle.author.name}
                </div>
                <div className="text-sm text-muted-foreground">{featuredArticle.author.role}</div>
              </div>
            </div>
          </div>
        </Link>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Link key={index} href={`/blog/${article.slug}`} className="group space-y-6 ">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {article.badge && (
                    <div className="absolute left-4 top-4">
                      <Badge
                        variant="secondary"
                        className="bg-white/10 text-white backdrop-blur-sm"
                      >
                        {article.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-medium">{article.title}</h2>
                  <p className="text-muted-foreground">{article.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-auto">
                <Image
                  src={article.author.image}
                  alt={article.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="text-sm">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {article.author.name}
                  </span>
                  <span className="text-muted-foreground"> • {article.author.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `plbase Posts`,
  }
}
