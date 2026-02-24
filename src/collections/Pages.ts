import type { CollectionConfig } from 'payload'
import { isAdmin, publishedOnly } from '../access/roles'
import { slugField } from '../fields/slugField'
import { seoFields } from '../fields/seoFields'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Content',
    description: 'Static pages (About, Contact, Privacy Policy, etc.)',
  },
  versions: {
    drafts: {
      autosave: true,
      validate: false,
    },
    maxPerDoc: 10,
  },
  access: {
    read: publishedOnly,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    slugField(),
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
    },
    {
      name: 'template',
      type: 'select',
      label: 'Page Template',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Full Width', value: 'full-width' },
        { label: 'With Sidebar', value: 'with-sidebar' },
        { label: 'Contact Form', value: 'contact' },
        { label: 'Legal Text', value: 'legal' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish Date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'For menu ordering (ascending)',
      },
    },
    ...seoFields,
  ],
}
