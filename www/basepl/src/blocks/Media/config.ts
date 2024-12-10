import type { Block } from 'payload'

const positionOptions = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top Left', value: 'top-left' },
  { label: 'Top Right', value: 'top-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Bottom Right', value: 'bottom-right' },
]

const fitOptions = [
  { label: 'Cover', value: 'cover' },
  { label: 'Contain', value: 'contain' },
  { label: 'Fill', value: 'fill' },
]

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaType',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isFullscreen',
          type: 'checkbox',
          label: 'Fullscreen',
          defaultValue: true,
          admin: {
            width: '30%',
            description: 'Media will span as large as possible',
          },
        },
        {
          name: 'isPriority',
          type: 'checkbox',
          label: 'Priority',
          defaultValue: true,
          admin: {
            width: '30%',
            description: 'Media will not lazy load',
          },
        },
      ],
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => siblingData?.isFullscreen === false,
      },
      fields: [
        {
          name: 'width',
          type: 'number',
          required: true,
          defaultValue: 800,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'height',
          type: 'number',
          required: true,
          defaultValue: 600,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'objectFit',
          type: 'select',
          defaultValue: 'cover',
          options: fitOptions,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'center',
          options: positionOptions,
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
