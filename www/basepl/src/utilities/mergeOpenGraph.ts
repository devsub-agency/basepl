import { Metadata } from 'next'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'basepl - An open-source library built on top of Payload CMS',
  images: [
    {
      url: `${getServerSideURL()}/basepl-logo.png`,
    },
  ],
  siteName: 'basepl - templates, components and plugins',
  title: 'basepl',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
