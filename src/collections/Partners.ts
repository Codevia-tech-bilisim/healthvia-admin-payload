import type { CollectionConfig } from 'payload'
import { isAdmin, publishedOnly } from '../access/roles'
import { slugField } from '../fields/slugField'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'city', 'isActive', 'order'],
    group: 'Healthcare',
    description: 'Partner hospitals, clinics, and healthcare institutions',
  },
  versions: { drafts: true },
  access: {
    read: publishedOnly,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Institution Name' },
    slugField('name'),
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Institution Type',
      options: [
        { label: 'Hospital', value: 'hospital' },
        { label: 'Clinic', value: 'clinic' },
        { label: 'Medical Center', value: 'medical-center' },
        { label: 'Laboratory', value: 'laboratory' },
        { label: 'Hotel', value: 'hotel' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Cover Image' },
    { name: 'description', type: 'richText', label: 'Description' },
    { name: 'shortDescription', type: 'textarea', label: 'Short Description', maxLength: 250 },
    {
      name: 'location',
      type: 'group',
      label: 'Location',
      fields: [
        { name: 'city', type: 'text', required: true, label: 'City' },
        { name: 'district', type: 'text', label: 'District' },
        { name: 'address', type: 'textarea', label: 'Address' },
        { name: 'mapUrl', type: 'text', label: 'Google Maps Link' },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact',
      fields: [
        { name: 'phone', type: 'text', label: 'Phone' },
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'website', type: 'text', label: 'Website' },
      ],
    },
    {
      name: 'accreditations',
      type: 'array',
      label: 'Accreditations',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Accreditation Name', admin: { description: 'e.g. "JCI", "ISO 9001", "TÜV"' } },
        { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo' },
      ],
    },
    { name: 'specialties', type: 'relationship', relationTo: 'treatment-categories', hasMany: true, label: 'Specialties' },
    { name: 'isActive', type: 'checkbox', label: 'Active', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'isFeatured', type: 'checkbox', label: 'Featured', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', label: 'Sort Order', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
