import { BaseplVideo } from "@/blocks/BaseplVideo/Component"
import { Media } from "@/payload-types"

export type DocsVideoProps = {
    videoUrl: string,
    width: number,
    height: number
}

export function DocsVideo(props: DocsVideoProps) {
    const video: Media = {
        id: "1",
        url: props.videoUrl,
        alt: "Video",
        width: props.width,
        height: props.height,
        updatedAt: "2021-09-01T00:00:00Z",
        createdAt: "2021-09-01T00:00:00Z"
    }
    return (
        <BaseplVideo video={video}  scaleOption="scale" blockType="baseplVideo" objectFit="contain" objectPosition="center" absoluteHeight={720}/>
    )
}