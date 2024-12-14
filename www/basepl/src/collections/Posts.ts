import { BaseplImage } from '@/blocks/BaseplImage/config'
import { BaseplVideo } from '@/blocks/BaseplVideo/config'
import { BaseplButton } from '@/blocks/BaseplButton/config'
import { BaseplRichtext } from '@/blocks/BaseplRichtext/config'
import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
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
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [BaseplButton, BaseplImage, BaseplVideo, BaseplRichtext],
              required: true,
            },
          ],
          label: 'Content',
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
