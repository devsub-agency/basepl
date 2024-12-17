import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'role',
          type: 'select',
          defaultValue: 'coFounder',
          options: [
            { label: 'Co-Founder', value: 'coFounder' },
            { label: 'Contributer', value: 'contributor' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
