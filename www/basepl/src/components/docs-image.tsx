'use client'

import { getMediaUrl } from '@/lib/media-url'
import { useState } from 'react'
import { ImageModal } from './ui/image-modal'
import { Button } from './ui/button'

export type DocsImageProps = {
  imagePath: string
  alt: string
  width: number
  height: number
}

export function DocsImage({ imagePath, alt, width, height }: DocsImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const finalImageUrl = getMediaUrl(imagePath)
  const aspectRatio = width / height

  return (
    <>
      <div
        className="relative my-6 overflow-hidden rounded-lg border"
        style={{ aspectRatio }}
      >
        <Button onClick={() => setIsModalOpen(true)} asChild variant="ghost">
          <img
            src={'/basepl-logo.png'}
            alt={alt}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </Button>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={finalImageUrl}
        alt={alt}
      />
    </>
  )
}
