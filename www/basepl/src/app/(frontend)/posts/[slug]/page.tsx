import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Post } from '@/payload-types'
import { redirect } from 'next/navigation'
import { generateMeta } from '@/utilities/generateMetadata'
import { BaseplButton } from '@/blocks/BaseplButton/Component'
import { BaseplImage } from '@/blocks/BaseplImage/Component'
import { BaseplVideo } from '@/blocks/BaseplVideo/Component'
import { BaseplRichtext } from '@/blocks/BaseplRichtext/Component'

const blockComponents = {
  baseplButton: BaseplButton,
  baseplImage: BaseplImage,
  baseplVideo: BaseplVideo,
  baseplRichtext: BaseplRichtext,
}

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
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) {
    redirect('/')
  }

  return (
    <div>
      {post.layout.map((block, index) => {
        const { blockName, blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            return (
              <div className="my-16" key={index}>
                {/* @ts-expect-error */}
                <Block id={index} {...block} />
              </div>
            )
          }
        }
        return null
      })}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
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
