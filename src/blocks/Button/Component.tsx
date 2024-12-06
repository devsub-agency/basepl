import { Button } from '@/components/ui/button'
import { ButtonType, Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

export const BaseplButton = (props: ButtonType) => {
  const { id, size, variant, isIconStart, hasIcon, icon, link } = props
  const {
    label,
    externalUrl,
    emailAddress,
    slug,
    useSlug,
    pageReference,
    isOpenNewTab,
    hasNoReferrer,
  } = link

  const target = externalUrl && isOpenNewTab ? '_blank' : undefined
  const reffererPolicy = hasNoReferrer ? 'no-referrer' : undefined
  const iconUrl = (icon as Media)?.url ?? '/'
  const alt = (icon as Media)?.alt ?? label

  const getHref = () => {
    if (slug && useSlug) {
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
      {hasIcon && isIconStart && <Image src={alt} alt={label} fill />}
      <Link href={getHref()} target={target} referrerPolicy={reffererPolicy}>
        {label}
      </Link>
      {hasIcon && <Image src={iconUrl} alt={alt} fill />}
    </Button>
  )
}
