import Image from 'next/image'
import { BaseplImageType, Media } from '@/payload-types'

export const BaseplImage = (props: BaseplImageType) => {
  const {
    image,
    isAbsoluteWidth,
    absoluteWidth,
    absoluteHeight,
    relativeWidth,
    objectPosition,
    objectFit,
    isPriority,
    scaleOption,
  } = props

  const imageData = image as Media
  const isScale = scaleOption === 'scale'

  const fallbackSlug = '/'
  const fallBackHeight = 500
  const fallBackWidth = 500

  const width =
    (isAbsoluteWidth ? absoluteWidth : relativeWidth + '%') ?? fallBackWidth
  const height = absoluteHeight ?? fallBackHeight
  const classes = 'relative'

  if (isScale) {
    return (
      <div
        id={imageData.id}
        className={classes}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src={imageData.url ?? fallbackSlug}
          alt={imageData.alt}
          priority={isPriority ?? false}
          objectFit={objectFit as string}
          objectPosition={objectPosition as string}
          width={imageData.width ?? fallBackWidth}
          height={imageData.height ?? fallBackHeight}
          layout="responsive"
        />
      </div>
    )
  }

  return (
    <div id={imageData.id} className={classes} style={{ width, height }}>
      <Image
        src={imageData.url ?? fallbackSlug}
        alt={imageData.alt}
        priority={isPriority ?? false}
        objectFit={objectFit as string}
        objectPosition={objectPosition as string}
        layout="fill"
      />
    </div>
  )
}
