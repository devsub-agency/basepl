import { Button } from '@/components/ui/button'
import { ButtonType, Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

export const BaseplButton = (props: ButtonType) => {
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
  } = link

  const getNavigationTarget = () => {
    if (externalUrl && isOpenNewTab) {
      return '_blank'
    }
    return undefined
  }

  const getReferrerPolicy = () => {
    if (hasNoReferrer) {
      return 'no-referrer'
    }
    return undefined
  }

  const getIconUrl = () => {
    if ((icon as Media)?.url) {
      return (icon as Media).url ?? fallbackIconSlug
    }
    return fallbackIconSlug
  }

  const getIconAlt = () => {
    if ((icon as Media)?.alt) {
      return (icon as Media).alt
    }
    return label
  }

  const getNavigationHref = () => {
    if (useSlug && slug) {
      return slug
    } else if (externalUrl) {
      return externalUrl
    } else if (emailAddress) {
      return `mailto:${emailAddress}`
    } else if (typeof pageReference?.value !== 'string') {
      return pageReference?.value.slug ?? fallbackSlug
    }
    return '/'
  }

  return (
    <Button variant={variant} size={size} id={id ?? ''} asChild>
      <Link
        href={getNavigationHref()}
        target={getNavigationTarget()}
        referrerPolicy={getReferrerPolicy()}
      >
        {hasIcon && isIconStart && <Image src={getIconUrl()} alt={getIconAlt()} fill />}
        {label}
        {hasIcon && !isIconStart && <Image src={getIconUrl()} alt={getIconAlt()} fill />}
      </Link>
    </Button>
  )
}
