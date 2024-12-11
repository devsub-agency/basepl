import { Button } from '@/components/ui/button'
import { BaseplButtonType, Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

export const BaseplButton = (props: BaseplButtonType) => {
  const fallbackSlug = '/'
  const fallbackIconSlug = '/'
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
    fileReference,
    targetType,
  } = link

  const referrerPolicy = hasNoReferrer ? 'no-referrer' : undefined
  const navigationTarget =
    (externalUrl && isOpenNewTab) || targetType === 'file' ? '_blank' : undefined

  const iconUrl = (icon as Media)?.url ?? fallbackIconSlug
  const iconWidth = (icon as Media)?.width ?? 24
  const iconHeight = (icon as Media)?.height ?? 24
  const iconAlt = (icon as Media)?.alt ?? label
  const fileReferenceUrl = (fileReference as Media)?.url ?? fallbackSlug

  const getNavigationHref = () => {
    if (targetType === 'page' && useSlug && slug) {
      return slug
    } else if (targetType === 'page' && typeof pageReference?.value !== 'string') {
      return pageReference?.value.slug ?? fallbackSlug
    } else if (targetType === 'external' && externalUrl) {
      return externalUrl
    } else if (targetType === 'email' && emailAddress) {
      return `mailto:${emailAddress}`
    } else if (targetType === 'file' && fileReference) {
      return fileReferenceUrl
    }
    return fallbackSlug
  }

  const IconComponent = (
    <Image src={iconUrl} alt={iconAlt} width={iconWidth} height={iconHeight} className="w-4 h-4" />
  )

  return (
    <Button variant={variant} size={size} id={id ?? ''} asChild>
      <Link href={getNavigationHref()} target={navigationTarget} referrerPolicy={referrerPolicy}>
        {hasIcon && isIconStart && IconComponent}
        {size !== 'icon' && label}
        {hasIcon && !isIconStart && IconComponent}
      </Link>
    </Button>
  )
}
