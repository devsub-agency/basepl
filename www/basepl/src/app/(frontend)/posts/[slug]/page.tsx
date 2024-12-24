import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Media, Post } from '@/payload-types'
import { redirect } from 'next/navigation'
import { generateMeta } from '@/utilities/generateMetadata'
import { BlogHero } from '../../components/BlogHero/Component'
import { BlogSidebar } from '../../components/BlogSidebar/Component'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { DiscordLogo } from '../../components/Logos/DiscordLogo'
import { BaseplRichtext } from '@/blocks/BaseplRichtext/Component'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })
  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  if (!post) {
    return redirect('/')
  }

  return (
    <main className="mx-auto flex max-w-screen-lg py-6 lg:gap-10 lg:py-8">
      <div className="mx-auto w-full min-w-0 px-5 pt-12 md:px-10 md:pt-24">
        <BlogHero
          slug={slug}
          title={post.title}
          headline={post.headline}
          date={post.date}
          readingTime={post.readingTime}
          imageSrc={(post.image as Media).url ?? '/'}
          alt={(post.image as Media).alt ?? ''}
        />
        <BaseplRichtext {...post.content} />
        <div className="relative mb-12 mt-8 flex w-full items-center justify-between md:mx-auto md:my-16">
          <div className="flex items-center space-x-3">
            <Image
              src={(post.profilePicture as Media)?.url ?? ''}
              alt={(post.profilePicture as Media)?.alt ?? ''}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-semibold text-muted-foreground">
                Maurice
              </div>
              <div className="text-sm text-muted-foreground">Co-Founder</div>
            </div>
          </div>
          <Button type="submit" id="discord" asChild>
            <Link href="https://discord.gg/b99KZMW2">
              <DiscordLogo isNative={false} />
              Join on Discord
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex lg:w-64">
        <BlogSidebar />
      </div>
    </main>
  )
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
