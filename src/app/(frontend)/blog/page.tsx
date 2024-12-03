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
    title: 'The vision behind basepl',
    description:
      'Get a quick overview of our vision for the open-source library basepl and how it can help you building applications with payload cms faster.',
    image: '/article-thumbnail.png',
    date: 'November 25, 2024',
    readTime: '1 min read',
    author: {
      name: 'Maurice Ihl',
      role: 'Co-founder',
      image: '/pb-maurice.png',
    },
    slug: 'introducing-ai-assistant',
  }

  const articles: Article[] = [
    {
      title: 'Strapi vs Payload - A comprehensive comparison',
      description:
        'All the relevant information you need to know to help you choose the right one.',
      image: '/strapi-vs-payload.png',
      author: {
        name: 'Maurice Ihl',
        image: '/pb-maurice.png',
        role: 'Co-Founder',
        date: 'November 20, 2024',
      },
      slug: 'simplifying-docs-for-ai',
    },
  ]

  return (
    <div className="bg-background">
      <main className="mx-auto max-w-screen-xl px-5 md:px-8 pt-20 pb-10 md:pt-40 md:pb-16">
        <Link
          href={`/blog/${featuredArticle.slug}`}
          className="mb-16 grid gap-8 md:gap-12 md:grid-cols-2"
        >
          <div className="relative overflow-hidden rounded-xl aspect-[16/9]">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              fill
              className="object-cover rounded-xl"
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
              <h1 className="text-2xl font-medium md:text-3xl">{featuredArticle.title}</h1>
              <p className="text-muted-foreground">{featuredArticle.description}</p>
            </div>
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
                <div className="text-sm text-muted-foreground">{featuredArticle.author.role}</div>
              </div>
            </div>
          </div>
        </Link>

        <div className="grid gap-8 md:grid-cols-2 md:grid-cols-3">
          {articles.map((article, index) => (
            <div key={index} className="group space-y-6">
              <div className="space-y-4">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4">
                    <Badge variant="secondary" className="bg-white/10 text-white backdrop-blur-sm">
                      {'Coming soon'}
                    </Badge>
                  </div>
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
                  className="rounded-full h-10 w-10 object-cover"
                />
                <div className="text-sm">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {article.author.name}
                  </span>
                  <span className="text-muted-foreground"> • {article.author.date}</span>
                </div>
              </div>
            </div>
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
