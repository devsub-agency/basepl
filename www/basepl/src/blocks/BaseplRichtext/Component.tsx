import { BaseplButtonType, BaseplImageType, BaseplRichtextType, BaseplVideoType } from '@/payload-types'
import { BaseplButton } from '../BaseplButton/Component'
import { BaseplImage } from '../BaseplImage/Component'
import { BaseplVideo } from '../BaseplVideo/Component'
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { cn } from '@/lib/utils'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<BaseplButtonType | BaseplVideoType | BaseplImageType>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    baseplImage: ({ node }) => <BaseplImage {...node.fields} />,
    baseplVideo: ({ node }) => <BaseplVideo {...node.fields} />,
    baseplButton: ({ node }) => <BaseplButton {...node.fields} />,
  },
})


export const BaseplRichtext = (props: BaseplRichtextType) => {
  const { content } = props

  return (
    <RichTextWithoutBlocks
      // @ts-expect-error
      converters={jsxConverters}
      className={cn()}
      {...{ data: content as SerializedEditorState }}
    />
  )
}
