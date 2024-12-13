import {LinkType} from "@/payload-types";
import {BaseplButton} from "@/blocks/BaseplButton/Component";

export default function ButtonExternal() {
  const link: LinkType = {
    label: "devsub",
    externalUrl: "https://devsub.de/en",
    emailAddress: null,
    slug: null,
    useSlug: false,
    pageReference: null,
    isOpenNewTab: true,
    hasNoReferrer: true,
    fileReference: null,
    targetType: "external",
  }

  return (
    <BaseplButton link={link} variant={"ghost"} size={"lg"} blockType={"baseplButton"}/>
  )
}
