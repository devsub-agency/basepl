import { BaseplImage } from '@/blocks/BaseplImage/Component'
import { Media } from '@/payload-types'

export default function DefaultImage() {
  const media: Media = {
    id: '1',
    url: '/basepl-logo.png',
    alt: 'BasePL Logo',
    width: 300,
    height: 300,
    updatedAt: '2021-09-01T00:00:00Z',
    createdAt: '2021-09-01T00:00:00Z',
  }

  return (
    <BaseplImage
      image={media}
      scaleOption="scale"
      absoluteHeight={100}
      objectFit="contain"
      objectPosition="center"
      blockType="baseplImage"
    />
  )
}
