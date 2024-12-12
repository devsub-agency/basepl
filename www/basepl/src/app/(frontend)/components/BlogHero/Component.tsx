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
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/posts/${slug}`}>{title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-medium md:font-4xl md:w-3/4">{headline}</h1>
      <div className="flex gap-4 mt-4">
        <span className="flex items-center gap-1 text-muted-foreground text-sm">
          <CalendarIcon className="h-4 w-4" />
          {new Date(date).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1 text-muted-foreground text-sm">
          <Clock className="h-4 w-4" />
          {readingTime + 'min'}
        </span>
      </div>
      <div className="relative w-full h-96 mt-8">
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
