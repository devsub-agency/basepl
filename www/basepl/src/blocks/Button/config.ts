import { link } from '@/fields/link'
import { Block, Field } from 'payload'

const buttonVariants = [
  { label: 'Default', value: 'default' },
  { label: 'Destructive', value: 'destructive' },
  { label: 'Outline', value: 'outline' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Ghost', value: 'ghost' },
  { label: 'Link', value: 'link' },
]

const buttonSizes = [
  { label: 'Default', value: 'default' },
  { label: 'Small', value: 'sm' },
  { label: 'Large', value: 'lg' },
  { label: 'Icon', value: 'icon' },
]

const localized = false

const styleOptions: Field = {
  type: 'collapsible',
  label: 'Styling options',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'hasIcon',
          type: 'checkbox',
          label: 'Add Icon',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'isIconStart',
          type: 'checkbox',
          label: 'Icon at start',
          admin: {
            condition: (_, sibling) => sibling?.hasIcon === true,
            width: '25%',
          },
        },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, sibling) => sibling?.hasIcon === true,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'default',
          required: true,
          options: buttonVariants,
          admin: { width: '50%' },
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'default',
          required: true,
          options: buttonSizes,
          admin: { width: '50%' },
        },
      ],
    },
  ],
}

export const Button: Block = {
  slug: 'button',
  interfaceName: 'ButtonType',
  fields: [link({ fieldIsLocalized: localized }), styleOptions],
  admin: {},
}