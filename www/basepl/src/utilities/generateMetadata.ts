import { Metadata } from 'next'
import { getServerSideURL, mergeOpenGraph } from './mergeOpenGraph'
import { Config, Media, Post } from '@/payload-types'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/basepl-logo.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.url
    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: { doc: Partial<Post> }): Promise<Metadata> => {
  const { doc } = args || {}
  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | basepl - components, templates & plugins for payload'
    : 'basepl - components, templates & plugins for payload'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
