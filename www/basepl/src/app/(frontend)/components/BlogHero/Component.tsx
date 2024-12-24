import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { CalendarIcon, Clock } from 'lucide-react'
import Image from 'next/image'

interface BlogHeroProps {
  slug: string
  title: string
  headline: string
  date: string
  readingTime: number
  imageSrc: string
  alt: string
}
export const BlogHero = (props: BlogHeroProps) => {
  const { slug, title, headline, date, imageSrc, alt, readingTime } = props

  return (
    <div>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/blog"
              className="text-muted-foreground no-underline"
            >
              Blog
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/posts/${slug}`}
              className="text-muted-foreground no-underline"
            >
              {title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="md:font-4xl text-3xl font-medium md:w-3/4">{headline}</h1>
      <div className="mt-4 flex gap-4">
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          {new Date(date).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {readingTime + 'min read'}
        </span>
      </div>
      <div className="relative mt-8 h-48 w-full md:h-96">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          objectFit="cover"
          objectPosition="center"
          className="rounded-xl"
        />
      </div>
    </div>
  )
}
