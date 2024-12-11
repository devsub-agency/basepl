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

export const BaseplImage: Block = {
  slug: 'baseplImage',
  labels: { singular: 'Image', plural: 'Images' },
  interfaceName: 'BaseplImageType',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'scaleOption',
          type: 'select',
          label: 'Size',
          defaultValue: 'scale',
          required: true,
          options: [
            { label: 'Auto scale', value: 'scale' },
            { label: 'Custom', value: 'custom' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'isPriority',
          type: 'checkbox',
          label: 'Priority',
          defaultValue: true,
          admin: {
            style: { padding: '16px 0 0 24px' },
            width: '50%',
            description: 'Media will not lazy load',
          },
        },
      ],
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => siblingData?.scaleOption === 'custom',
      },
      fields: [
        {
          name: 'isAbsoluteWidth',
          type: 'checkbox',
          label: 'Absolute Width',
          defaultValue: true,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'isAbsoluteHeight',
          type: 'checkbox',
          label: 'Absolute Height',
          defaultValue: true,
          admin: {
            width: '25%',
          },
        },
      ],
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
          required: true,
          defaultValue: 800,
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.isAbsoluteWidth,
          },
        },
        {
          name: 'absoluteHeight',
          type: 'number',
          label: 'Height (px)',
          required: true,
          defaultValue: 600,
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.isAbsoluteHeight,
          },
        },
        {
          name: 'relativeWidth',
          type: 'number',
          label: 'Width (%)',
          required: true,
          defaultValue: 100,
          admin: {
            width: '50%',
            condition: (_, siblingData) => !siblingData?.isAbsoluteWidth,
          },
        },
        {
          name: 'relativeHeight',
          type: 'number',
          label: 'Height (%)',
          required: true,
          defaultValue: 100,
          admin: {
            width: '50%',
            condition: (_, siblingData) => !siblingData?.isAbsoluteHeight,
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
