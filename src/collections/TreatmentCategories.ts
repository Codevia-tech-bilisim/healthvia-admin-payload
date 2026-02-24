import type { CollectionConfig } from 'payload'
import { isAdmin, publishedOnly } from '../access/roles'
import { slugField } from '../fields/slugField'
import { seoFields } from '../fields/seoFields'

export const TreatmentCategories: CollectionConfig = {
  slug: 'treatment-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'priceRange', '_status', 'order'],
    group: 'Healthcare',
    description: 'Treatment categories displayed on the frontend website',
  },
  versions: {
    drafts: {
      autosave: true,
      validate: false,
    },
    maxPerDoc: 5,
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
      label: 'Treatment Name',
    },
    slugField(),
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      admin: {
        description: 'e.g. "Affordable dental treatment in Turkey"',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Detailed Description',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
      maxLength: 250,
      admin: {
        description: 'Brief text used in card views',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Main Category',
      options: [
        { label: 'Dental', value: 'dental' },
        { label: 'Cosmetic Surgery', value: 'cosmetic-surgery' },
        { label: 'Ophthalmology', value: 'ophthalmology' },
        { label: 'Hair Transplant', value: 'hair-transplant' },
        { label: 'Orthopedics', value: 'orthopedics' },
        { label: 'Cardiology', value: 'cardiology' },
        { label: 'Oncology', value: 'oncology' },
        { label: 'Bariatric Surgery', value: 'bariatric' },
        { label: 'IVF / Fertility', value: 'ivf' },
        { label: 'Dermatology', value: 'dermatology' },
        { label: 'Health Check-up', value: 'checkup' },
        { label: 'Other', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon',
      admin: {
        position: 'sidebar',
        description: 'Lucide icon name (e.g. "heart", "eye")',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      admin: {
        description: 'Additional images (before/after, etc.)',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', label: 'Caption' },
      ],
    },
    {
      name: 'priceRange',
      type: 'group',
      label: 'Price Range',
      fields: [
        { name: 'from', type: 'number', label: 'Starting ($)' },
        { name: 'to', type: 'number', label: 'Up to ($)' },
        {
          name: 'note',
          type: 'text',
          label: 'Price Note',
          admin: { description: 'e.g. "Varies per patient", "Package included"' },
        },
      ],
    },
    {
      name: 'process',
      type: 'array',
      label: 'Treatment Process',
      admin: { description: 'Step-by-step treatment journey' },
      fields: [
        { name: 'step', type: 'number', required: true, label: 'Step #' },
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'description', type: 'textarea', label: 'Description' },
        {
          name: 'duration',
          type: 'text',
          label: 'Duration',
          admin: { description: 'e.g. "1-2 hours", "3-5 days"' },
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      fields: [
        { name: 'question', type: 'text', required: true, label: 'Question' },
        { name: 'answer', type: 'textarea', required: true, label: 'Answer' },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      label: 'Statistics',
      admin: { description: 'Key numbers displayed on the frontend' },
      fields: [
        { name: 'successRate', type: 'text', label: 'Success Rate', admin: { description: 'e.g. "98%"' } },
        { name: 'averageStay', type: 'text', label: 'Average Stay', admin: { description: 'e.g. "5-7 days"' } },
        { name: 'recoveryTime', type: 'text', label: 'Recovery Time', admin: { description: 'e.g. "2-4 weeks"' } },
        { name: 'patientsServed', type: 'text', label: 'Patients Served', admin: { description: 'e.g. "5,000+"' } },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on homepage?',
      },
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      label: 'Popular',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    ...seoFields,
  ],
}
