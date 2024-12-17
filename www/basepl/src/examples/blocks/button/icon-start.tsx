import { BaseplButton } from "@/blocks/BaseplButton/Component"
import { LinkType, Media } from "@/payload-types"

export default function ButtonIconStart() {
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

    const icon: Media = {
        id: "1",
        url: '/basepl-logo.png',
        alt: "BasePL Logo",
        width: 36,
        height: 36,
        updatedAt: "2021-09-01T00:00:00Z",
        createdAt: "2021-09-01T00:00:00Z"
    }

    return (
        <BaseplButton link={link} variant={"secondary"} size={"icon"} blockType={"baseplButton"} icon={icon} isIconStart />
    )
}