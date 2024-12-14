import { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical'
import { BaseplImage } from '../BaseplImage/config'
import { BaseplVideo } from '../BaseplVideo/config'
import { BaseplButton } from '../BaseplButton/config'

export const BaseplRichtext: Block = {
  slug: 'baseplRichtext',
  interfaceName: 'BaseplRichtextType',
  labels: {
    singular: 'Richtext',
    plural: 'Richtexts',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            EXPERIMENTAL_TableFeature(),
            BlocksFeature({
              blocks: [BaseplButton, BaseplImage, BaseplVideo],
            }),
          ]
        },
      }),
      label: 'content',
    },
  ],
}
