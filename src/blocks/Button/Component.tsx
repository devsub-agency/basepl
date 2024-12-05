import { Button } from '@/components/ui/button'
import { ButtonType } from '@/payload-types'
import Link from 'next/link'

export const BaseplButton = (props: ButtonType) => {
  const { id, size, variant, isIconStart, hasIcon, link } = props
  const { label, externalUrl, emailAddress, slug, pageReference } = link

  const getHref = () => {
    if (slug) {
      return slug
    }
    if (externalUrl) {
      return externalUrl
    }
    if (emailAddress) {
      return `mailto:${emailAddress}`
    }
    if (typeof pageReference?.value !== 'string') {
      return pageReference?.value.slug as string
    }
    return '/'
  }

  return (
    <Button variant={variant} size={size} id={id ?? ''} asChild>
      <Link href={getHref()}></Link>
    </Button>
  )
}
