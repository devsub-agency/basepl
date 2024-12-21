import { Block, Field } from 'payload'
import { link } from '@/fields/link'

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
            condition: (_, sibling) => sibling?.hasIcon,
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
        condition: (_, sibling) => sibling?.hasIcon,
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

export const BaseplButton: Block = {
  slug: 'baseplButton',
  interfaceName: 'BaseplButtonType',
  labels: { singular: 'Button', plural: 'Buttons' },
  fields: [link({ fieldIsLocalized: localized }), styleOptions],
}
