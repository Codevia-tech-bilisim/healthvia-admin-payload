import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSalesAgent, publishedOnly } from '../access/roles'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', '_status'],
    group: 'Content',
    description: 'Frequently asked questions for the website FAQ section',
  },
  versions: { drafts: true },
  access: {
    read: publishedOnly,
    create: isAdminOrSalesAgent,
    update: isAdminOrSalesAgent,
    delete: isAdmin,
  },
  fields: [
    { name: 'question', type: 'text', required: true, label: 'Question' },
    { name: 'answer', type: 'richText', required: true, label: 'Answer' },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Treatment Process', value: 'treatment-process' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Travel & Accommodation', value: 'travel' },
        { label: 'Visa & Documents', value: 'visa' },
        { label: 'Payment', value: 'payment' },
        { label: 'Aftercare', value: 'aftercare' },
        { label: 'Safety & Accreditation', value: 'safety' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'relatedTreatment', type: 'relationship', relationTo: 'treatment-categories', label: 'Related Treatment', admin: { position: 'sidebar', description: 'Select if specific to a treatment' } },
    { name: 'order', type: 'number', label: 'Sort Order', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
