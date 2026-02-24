import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSalesAgent, publishedOnly } from '../access/roles'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'patientName',
    defaultColumns: ['patientName', 'country', 'treatmentType', 'rating', '_status'],
    group: 'Content',
    description: 'Patient reviews and success stories',
  },
  versions: { drafts: true },
  access: {
    read: publishedOnly,
    create: isAdminOrSalesAgent,
    update: isAdminOrSalesAgent,
    delete: isAdmin,
  },
  fields: [
    { name: 'patientName', type: 'text', required: true, label: 'Patient Name' },
    { name: 'country', type: 'text', required: true, label: 'Country', admin: { description: 'e.g. "Germany", "United Kingdom"' } },
    { name: 'countryFlag', type: 'text', label: 'Flag Emoji', admin: { position: 'sidebar', description: 'e.g. 🇩🇪, 🇬🇧' } },
    { name: 'avatar', type: 'upload', relationTo: 'media', label: 'Photo' },
    { name: 'treatmentType', type: 'relationship', relationTo: 'treatment-categories', label: 'Treatment Type', admin: { position: 'sidebar' } },
    { name: 'doctor', type: 'relationship', relationTo: 'doctor-profiles', label: 'Doctor', admin: { position: 'sidebar' } },
    { name: 'rating', type: 'number', required: true, label: 'Rating', min: 1, max: 5, admin: { position: 'sidebar', description: '1-5 star rating' } },
    { name: 'title', type: 'text', label: 'Review Title', admin: { description: 'e.g. "Life-changing experience!"' } },
    { name: 'testimonial', type: 'textarea', required: true, label: 'Review' },
    { name: 'videoUrl', type: 'text', label: 'Video URL', admin: { description: 'YouTube or Vimeo link (optional)' } },
    {
      name: 'beforeAfterImages',
      type: 'group',
      label: 'Before / After Images',
      fields: [
        { name: 'before', type: 'upload', relationTo: 'media', label: 'Before' },
        { name: 'after', type: 'upload', relationTo: 'media', label: 'After' },
      ],
    },
    { name: 'isFeatured', type: 'checkbox', label: 'Featured', defaultValue: false, admin: { position: 'sidebar', description: 'Show on homepage?' } },
    { name: 'date', type: 'date', label: 'Review Date', admin: { position: 'sidebar' } },
  ],
}
