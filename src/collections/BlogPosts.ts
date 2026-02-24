import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSalesAgent, publishedOnly } from '../access/roles'
import { slugField } from '../fields/slugField'
import { seoFields } from '../fields/seoFields'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', '_status', 'publishedAt'],
    group: 'Content',
    description: 'Blog articles for SEO and content marketing',
  },
  versions: {
    drafts: {
      autosave: true,
      validate: false,
    },
    maxPerDoc: 15,
  },
  access: {
    read: publishedOnly,
    create: isAdminOrSalesAgent,
    update: isAdminOrSalesAgent,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      maxLength: 300,
      admin: {
        description: 'Short summary shown in blog listings and social media shares',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Health Tourism', value: 'health-tourism' },
        { label: 'Treatment Guide', value: 'treatment-guide' },
        { label: 'Patient Experience', value: 'patient-experience' },
        { label: 'Turkey Guide', value: 'turkey-guide' },
        { label: 'Health Tips', value: 'health-tips' },
        { label: 'News', value: 'news' },
        { label: 'Technology', value: 'technology' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Author',
      admin: { position: 'sidebar' },
    },
    {
      name: 'relatedTreatments',
      type: 'relationship',
      relationTo: 'treatment-categories',
      hasMany: true,
      label: 'Related Treatments',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Publish Date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'readTime',
      type: 'number',
      label: 'Read Time (min)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    ...seoFields,
  ],
}
