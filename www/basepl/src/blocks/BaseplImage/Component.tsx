import Image from 'next/image'
import { BaseplImageType, Media } from '@/payload-types'

export const BaseplImage = (props: BaseplImageType) => {
  const {
    image,
    absoluteWidth,
    absoluteHeight,
    objectPosition,
    objectFit,
    isPriority,
    scaleOption,
  } = props
  const imageData = image as Media
  const isScale = scaleOption === 'scale'
  const fallbackSlug = '/'

  const width = absoluteWidth ?? 0
  const height = absoluteHeight ?? 0

  return (
    <div
      id={imageData.id}
      className="relative"
      style={{
        width: isScale ? '100%' : width,
        height: isScale ? '100%' : height,
      }}
    >
      <Image
        src={imageData.url ?? fallbackSlug}
        alt={imageData.alt}
        priority={isPriority ?? false}
        objectFit={objectFit as string}
        objectPosition={objectPosition as string}
        {...(!isScale ? { layout: 'fill' } : { width, height })}
      />
    </div>
  )
}
