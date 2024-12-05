import type { Field, TextFieldSingleValidation } from 'payload'

export const link = ({ fieldIsLocalized = false }) => {
  const linkconfig: Field = {
    name: 'link',
    type: 'group',
    interfaceName: 'LinkType',
    localized: fieldIsLocalized,
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'textLabel',
            type: 'text',
            maxLength: 30,
            required: true,
            admin: { width: '50%' },
          },
          {
            name: 'targetType',
            type: 'select',
            required: true,
            admin: { width: '50%' },
            defaultValue: 'page',
            options: [
              { label: 'Page', value: 'page' },
              { label: 'File Download', value: 'file' },
              { label: 'External URL', value: 'external' },
              { label: 'Email Address', value: 'email' },
            ],
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'isOpenNewTab',
            type: 'checkbox',
            label: 'Open in new tab',
            defaultValue: true,
            admin: {
              width: '25%',
              condition: (_, sibling) => sibling?.targetType === 'external',
            },
          },
          {
            name: 'hasNoReferrer',
            type: 'checkbox',
            label: 'No referrer',
            defaultValue: false,
            admin: {
              width: '25%',
              condition: (_, sibling) => sibling?.targetType === 'external',
            },
          },
          {
            name: 'useSlug',
            type: 'checkbox',
            label: 'Use Slug instead',
            admin: {
              condition: (_, sibling) => sibling?.targetType === 'page',
            },
          },
        ],
      },
      {
        name: 'externalUrl',
        type: 'text',
        required: true,
        admin: {
          width: '100%',
          condition: (_, sibling) => sibling?.targetType === 'external',
        },
      },
      {
        name: 'emailAddress',
        type: 'text',
        required: true,
        validate: ((value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(value) || 'Please enter a valid email address'
        }) as TextFieldSingleValidation,
        admin: {
          width: '100%',
          condition: (data, sibling) => sibling?.targetType === 'email',
        },
      },

      {
        name: 'slug',
        type: 'text',
        required: true,
        admin: {
          width: '100%',
          condition: (data, sibling) => sibling?.targetType === 'page' && sibling?.useSlug === true,
        },
      },
      {
        name: 'pageReference',
        type: 'relationship',
        relationTo: ['posts'],
        required: true,
        admin: {
          width: '100%',
          condition: (data, sibling) => sibling?.targetType === 'page' && !sibling?.useSlug,
        },
      },
      {
        name: 'fileReference',
        type: 'upload',
        relationTo: 'media',
        required: true,
        admin: {
          width: '100%',
          condition: (data, sibling) => sibling?.targetType === 'file',
        },
      },
    ],
  }
  return linkconfig
}
