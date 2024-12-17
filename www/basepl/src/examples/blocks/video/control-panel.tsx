import { BaseplVideo } from "@/blocks/BaseplVideo/Component"
import { Media } from "@/payload-types"

export default function ControlPanelVideo() {

    const video: Media ={
        id: "1",
        url: '/roses-winter.mp4',
        alt: "Roses in Winter getting covert with snow",
        updatedAt: "2021-09-01T00:00:00Z",
        createdAt: "2021-09-01T00:00:00Z"
    }

    return (
        <BaseplVideo video={video} showControls scaleOption="scale" absoluteHeight={420} objectFit="fill" objectPosition="center" blockType="baseplVideo"/>
    )
}