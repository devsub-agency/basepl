import {LinkType} from "@/payload-types";
import {BaseplButton} from "@/blocks/BaseplButton/Component";

export default function ButtonLink() {
  const link: LinkType = {
    label: "Button",
    externalUrl: null,
    emailAddress: null,
    slug: null,
    useSlug: false,
    pageReference: null,
    isOpenNewTab: false,
    hasNoReferrer: true,
    fileReference: null,
    targetType: "page",
  }

  return (
    <BaseplButton link={link} variant={"link"} size={"sm"} blockType={"baseplButton"}/>
  )
}
