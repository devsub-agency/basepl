import type { Metadata } from 'next/types'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `plbase Posts`,
  }
}
