import { getPayload, User } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Media, Post } from '@/payload-types'
import { Metadata } from 'next'
import { cn } from '@/lib/utils'
interface ArticleProps {
  article: Post
  isFeatured?: boolean
}

export const dynamic = 'force-dynamic'
export const revalidate = 600

const ArticleCard = ({ article, isFeatured = false }: ArticleProps) => {
  const containerClass = isFeatured
    ? 'mb-16 grid gap-8 md:gap-12 md:grid-cols-2'
    : 'group space-y-6'

  return (
    <Link href={`/posts/${article.slug}`} className={containerClass}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
        <Image
          src={(article.image as Media)?.url ?? ''}
          alt={(article.image as Media)?.alt ?? ''}
          className="rounded-xl object-cover"
          priority={isFeatured}
          fill
        />
        <div className="absolute left-4 top-4">
          <Badge
            variant="secondary"
            className="bg-white/10 text-white backdrop-blur-sm"
          >
            {isFeatured ? 'NEW' : article.categoryTag}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <div
            className={cn('mb-4 flex gap-1 text-sm text-muted-foreground', {
              hidden: !isFeatured,
            })}
          >
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{article.readingTime + ' min read'}</span>
          </div>
          <h2
            className={cn(
              'text-2xl font-medium',
              { 'md:text-3xl': isFeatured },
              { 'md:text-xl': !isFeatured },
            )}
          >
            {article.headline}
          </h2>
          <p className="text-muted-foreground">{article.previewDescription}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Image
            src={(article.profilePicture as Media)?.url ?? ''}
            alt={(article.profilePicture as Media)?.alt ?? ''}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className={cn('flex gap-1 text-sm', { 'flex-col': isFeatured })}>
            <span className="text-sm font-semibold text-muted-foreground">
              {article.populatedAuthors?.name}
            </span>
            <span
              className={cn('text-muted-foreground', { hidden: isFeatured })}
            >
              •
            </span>
            <span
              className={cn('text-muted-foreground', { hidden: isFeatured })}
            >
              {new Date(article.date).toLocaleDateString()}
            </span>
            <span
              className={cn('text-muted-foreground', { hidden: !isFeatured })}
            >
              {article.populatedAuthors?.role === 'coFounder'
                ? 'Co-Founder'
                : 'Contributor'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    select: {
      content: false,
    },
  })

  const featuredArticle: Post = posts.docs[0] || {}
  const articles = posts.docs.slice(1)

  return (
    <div className="bg-background">
      <main className="mx-auto max-w-screen-xl px-5 pb-10 pt-20 md:px-8 md:pb-16 md:pt-40">
        <ArticleCard article={featuredArticle} isFeatured />
        <div className="grid gap-8 md:grid-cols-2 md:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </main>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Latest articles on basepl and Payload CMS`,
    description:
      'Explore helpful articles such as comparisons, tutorials and more to help you build applications more efficiently.',
    openGraph: {
      images: [{ url: '/basepl-logo.png' }],
    },
  }
}
