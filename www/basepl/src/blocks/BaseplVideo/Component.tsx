import { BaseplVideoType, Media } from '@/payload-types'

export const BaseplVideo = (props: BaseplVideoType) => {
  const {
    video,
    showControls,
    autoPlay,
    loop,
    muted,
    isAbsoluteWidth,
    absoluteWidth,
    relativeWidth,
    absoluteHeight,
    scaleOption,
    objectFit,
    objectPosition,
  } = props
  const videoData = video as Media
  const fallbackSlug = '/'
  const isScale = scaleOption === 'scale'

  const fallBackHeight = 500
  const fallBackWidth = 500

  const width = (isAbsoluteWidth ? absoluteWidth : relativeWidth + '%') ?? fallBackWidth
  const height = absoluteHeight ?? fallBackHeight

  return (
    <video
      id={videoData.id}
      className="relative"
      style={{
        objectFit: objectFit ?? undefined,
        objectPosition: objectPosition ?? undefined,
        width: isScale ? '100%' : width,
        height: isScale ? '100%' : height,
      }}
      src={videoData.url ?? fallbackSlug}
      autoPlay={autoPlay ?? false}
      loop={loop ?? false}
      muted={muted ?? false}
      controls={showControls ?? false}
      playsInline
    >
      <p>{videoData.alt}</p>
    </video>
  )
}
