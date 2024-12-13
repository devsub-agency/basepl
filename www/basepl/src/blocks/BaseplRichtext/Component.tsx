import { BaseplRichtextType } from '@/payload-types'
import RichText from './RichText'

export const BaseplRichtext = (props: BaseplRichtextType) => {
  const { content } = props
  return <RichText content={content} />
}
