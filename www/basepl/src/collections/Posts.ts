import { BaseplRichtext } from '@/blocks/BaseplRichtext/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import type { CollectionConfig } from 'payload'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
    afterRead: [populateAuthors],
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'date',
      name: 'date',
      required: true,
      admin: { width: '50%', position: 'sidebar' },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'users',
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'group',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'role',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'previewDescription',
          required: true,
          admin: { width: '50%' },
        },
        {
          type: 'text',
          name: 'categoryTag',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  name: 'title',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                { type: 'number', name: 'readingTime', required: true, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  name: 'headline',
                  required: true,
                },
                {
                  type: 'upload',
                  name: 'image',
                  relationTo: 'media',
                  required: true,
                  filterOptions: { mimeType: { contains: 'image' } },
                  admin: { width: '100%' },
                },
              ],
            },
          ],
          label: 'Hero',
        },
        {
          name: 'content',
          interfaceName: BaseplRichtext.interfaceName,
          fields: BaseplRichtext.fields,
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.status === 'published',
      },
    },
  ],
  timestamps: true,
}
