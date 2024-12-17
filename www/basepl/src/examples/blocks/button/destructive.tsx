import { BaseplButton } from "@/blocks/BaseplButton/Component"
import { LinkType } from "@/payload-types"

export default function ButtonDestructive() {
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
    <BaseplButton link={link} variant={"destructive"} size={"lg"} blockType={"baseplButton"}/>
  )
}