import { BaseplImage } from "@/blocks/BaseplImage/Component";

//TODO: maybe allow image for examples 
export default function DefaultImage() {
    return (
        <BaseplImage image={"pb-maurice.png"} scaleOption="scale" absoluteHeight={300} objectFit="contain" objectPosition="center" blockType="baseplImage" />
    )
}