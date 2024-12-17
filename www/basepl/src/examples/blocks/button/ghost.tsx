import { BaseplButton } from "@/blocks/BaseplButton/Component"
import { LinkType } from "@/payload-types"

export default function ButtonGhost() {
  const link: LinkType = {
    label: "Button",
    externalUrl: null,
    emailAddress: null,
    slug: '#',
    useSlug: true,
    pageReference: null,
    isOpenNewTab: false,
    hasNoReferrer: true,
    fileReference: null,
    targetType: "page",
  }

  return (
    <BaseplButton link={link} variant={"ghost"} size={"lg"} blockType={"baseplButton"} />
  )
}