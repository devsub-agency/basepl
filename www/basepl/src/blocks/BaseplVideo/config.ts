import type { Block } from 'payload'

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
        mimeType: { equals: 'video' },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'playsInline',
          type: 'checkbox',
          label: 'Plays Inline',
          defaultValue: true,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'autoPlay',
          type: 'checkbox',
          label: 'Autoplay',
          defaultValue: true,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'loop',
          type: 'checkbox',
          label: 'Loop',
          defaultValue: true,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'muted',
          type: 'checkbox',
          label: 'Muted',
          defaultValue: true,
          admin: {
            width: '20%',
          },
        },
      ],
    },
    {
      name: 'isScale',
      type: 'checkbox',
      label: 'Scale',
      defaultValue: true,
      admin: {
        width: '20%',
        description: 'Video will span as large as possible',
      },
    },
    {
      type: 'row',
      admin: {
        condition: (data, siblingData) => siblingData?.isScale === false,
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
      ],
    },
  ],
}
