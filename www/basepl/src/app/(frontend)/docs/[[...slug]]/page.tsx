import { Mdx } from '@/components/mdx-components'
import { absoluteUrl, cn } from '@/lib/utils'
import '@/style/mdx.css'
import { allDocs } from 'contentlayer/generated'
import { ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { siteConfig } from '../../site'
import { BlogSidebar } from '../../components/BlogSidebar/Component'

type Args = {
  params: Promise<{ slug: string[] }>
}

async function getDocFromParams(slug: string[]) {
  const path = slug.join('/') || ''
  const doc = allDocs.find((doc) => doc.slugAsParams === path)
  if (!doc) {
    return null
  }

  return doc
}

export async function generateMetadata(params: Args): Promise<Metadata> {
  const path = await params.params
  if (!path.slug || path.slug.length === 0) {
    return {}
  }
  const doc = await getDocFromParams(path.slug)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.description,
      images: [siteConfig.ogImage],
      creator: '@devsub',
    },
  }
}

export default async function Page(params: Args) {
  const docName = await params.params

  if (!docName.slug || docName.slug.length === 0) {
    redirect('/docs/getting-started')
  }

  const doc = await getDocFromParams(docName.slug)
  if (!doc) {
    notFound()
  }

  return (
    <main className="flex py-6 lg:gap-10 lg:py-8">
      <div className="mx-auto w-full min-w-0">
        <div className="text-muted-foreground mb-4 flex items-center space-x-1 text-sm leading-none">
          <div className="truncate">Docs</div>
          <ChevronRight className="size-3.5" />
          <div className="text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn('scroll-m-20 text-3xl font-bold tracking-tight')}>{doc.title}</h1>
          {doc.description && <p className="text-muted-foreground text-base">{doc.description}</p>}
        </div>
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
      </div>
      <div className="sticky flex">
        <BlogSidebar />
      </div>
    </main>
  )
}
