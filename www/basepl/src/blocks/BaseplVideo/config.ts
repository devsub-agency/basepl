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
        { label: 'Fill', value: 'scale' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'isAbsoluteWidth',
      type: 'checkbox',
      label: 'Absolute Width',
      defaultValue: true,
      admin: {
        width: '25%',
        condition: (_, siblingData) => siblingData?.scaleOption === 'custom',
      },
    },

    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => siblingData?.scaleOption === 'custom',
      },
      fields: [
        {
          name: 'absoluteWidth',
          type: 'number',
          label: 'Width (px)',
          min: 1,
          required: true,
          defaultValue: 800,
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.isAbsoluteWidth,
          },
        },
        {
          name: 'relativeWidth',
          type: 'number',
          label: 'Width (%)',
          required: true,
          defaultValue: 100,
          min: 1,
          max: 100,
          admin: {
            width: '50%',
            condition: (_, siblingData) => !siblingData?.isAbsoluteWidth,
          },
        },
        {
          name: 'absoluteHeight',
          type: 'number',
          label: 'Height (px)',
          min: 1,
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
