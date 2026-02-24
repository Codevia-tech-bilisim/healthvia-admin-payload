import type { Field } from 'payload'

export const seoFields: Field[] = [
  {
    name: 'meta',
    type: 'group',
    label: 'SEO',
    admin: {
      description: 'Search engine optimization settings',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Meta Title',
        admin: {
          description: 'Page title (60 characters recommended). Falls back to main title if empty.',
        },
        maxLength: 80,
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Meta Description',
        admin: {
          description: 'Description shown in search results (155 characters recommended).',
        },
        maxLength: 200,
      },
      {
        name: 'keywords',
        type: 'text',
        label: 'Keywords',
        admin: {
          description: 'Comma-separated keywords',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'OG Image',
        admin: {
          description: 'Image for social media sharing (1200x630 recommended)',
        },
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        label: 'Hide from search engines',
        defaultValue: false,
      },
    ],
  },
]
