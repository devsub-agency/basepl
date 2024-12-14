import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  // eslint: {
  //   // CAUTION - Quick fix
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   // ignoreDuringBuilds: true,
  // },
}

export default withPayload(nextConfig)
