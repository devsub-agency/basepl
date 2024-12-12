import { Metadata } from 'next'
import { draftMode, headers } from 'next/headers'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
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

const queryPostBySlug = async (slug: string) => {
  if (!slug) {
    return null
  }

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayloadHMR({ config: configPromise })
  const authResult = draft ? await payload.auth({ headers: await headers() }) : undefined
  const user = authResult?.user

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: false,
    user,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return posts.docs?.map(({ slug }) => ({ slug }))
}

interface PostProps {
  params: {
    slug: string
  }
}

const Post = async ({ params }: PostProps) => {
  const { slug } = await params
  if (!slug) {
    return null
  }

  const url = `/posts/${slug}`
  const post = await queryPostBySlug(slug)

  if (!post) {
    return null
  }

  const renderBreadcrumb = () => (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/posts/${slug}`}>{post.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  const renderHeader = () => (
    <header className="mb-8">
      <h1 className="mb-4 text-3xl font-medium tracking-tight md:w-3/4">{post.title}</h1>
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
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">Test</div>
    </header>
  )

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-screen-xl px-4 py-8 px-5 md:px-8 pt-20 pb-10 md:pt-40 md:pb-16">
        {renderBreadcrumb()}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">{renderHeader()}</div>
        </div>
      </div>
    </div>
  )
}

export default Post

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
