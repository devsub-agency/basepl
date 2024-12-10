import Image from 'next/image'
import { Media, MediaType } from '@/payload-types'
import { cn } from '@/lib/utils'

export const MediaBlock = (props: MediaType) => {
  const { media, width, height, isFullscreen, position, objectFit, isPriority } = props
  const { alt } = media as Media
  const mediaData = media as Media

  const isVideo = mediaData?.mimeType?.includes('video')
  const mediaClasses = cn('relative', `object-${position}`, `object-${objectFit}`, {
    'w-full': isFullscreen,
  })

  if (isVideo) {
    return (
      <video
        id={mediaData.id}
        src={mediaData.url || ''}
        className={mediaClasses}
        width={isFullscreen ? '100%' : width}
        height={isFullscreen ? '100%' : height}
        playsInline
        autoPlay
        loop
        muted
      >
        <p>{mediaData.alt}</p>
      </video>
    )
  }

  return (
    <Image
      id={mediaData.id}
      src={mediaData.url || ''}
      alt={alt || mediaData.alt || ''}
      width={mediaData.width || width}
      height={mediaData.height || height}
      style={{ width: isFullscreen ? '100%' : width, height: isFullscreen ? '100%' : height }}
      className={mediaClasses}
      priority={isPriority || false}
    />
  )
}
