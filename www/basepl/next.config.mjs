import { withPayload } from '@payloadcms/next/withPayload'
import { createContentlayerPlugin } from "next-contentlayer2"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})
export default withContentlayer(withPayload(nextConfig))
