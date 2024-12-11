import type { Block } from 'payload'

const positionOptions = [
  { label: 'Center', value: 'center' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
]

const fitOptions = [
  { label: 'Cover', value: 'cover' },
  { label: 'Contain', value: 'contain' },
  { label: 'Fill', value: 'fill' },
]

export const BaseplVideo: Block = {
  slug: 'baseplVideo',
  labels: { singular: 'Video', plural: 'Videos' },
  interfaceName: 'BaseplVideoType',
  fields: [
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'video' },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showControls',
          type: 'checkbox',
          label: 'Control panel',
          defaultValue: true,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'autoPlay',
          type: 'checkbox',
          label: 'Autoplay',
          defaultValue: true,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'loop',
          type: 'checkbox',
          label: 'Loop sequence',
          defaultValue: true,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'muted',
          type: 'checkbox',
          label: 'Muted audio',
          defaultValue: true,
          admin: {
            width: '25%',
          },
        },
      ],
    },
    {
      name: 'scaleOption',
      type: 'select',
      label: 'Size',
      required: true,
      defaultValue: 'scale',
      options: [
        { label: 'Auto scale', value: 'scale' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => siblingData?.scaleOption === 'custom',
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
          required: true,
          defaultValue: 'cover',
          options: fitOptions,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'objectPosition',
          type: 'select',
          required: true,
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
