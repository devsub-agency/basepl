import Image from 'next/image'
import { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

export const BaseplImage = (props: any) => {
  const { media, width, height, isScale, position, objectFit, isPriority } = props
  const { alt } = media as Media
  const mediaData = media as Media

  const mediaClasses = cn('relative', `object-${position}`, `object-${objectFit}`, {
    'w-full': isScale,
  })

  return (
    <Image
      id={mediaData.id}
      src={mediaData.url || ''}
      alt={alt || ''}
      width={mediaData.width || width}
      height={mediaData.height || height}
      style={{ width: isScale ? '100%' : width, height: isScale ? '100%' : height }}
      className={mediaClasses}
      priority={isPriority || false}
    />
  )
}
