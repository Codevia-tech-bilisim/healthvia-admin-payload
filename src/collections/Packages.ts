import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSalesAgent, publishedOnly } from '../access/roles'
import { slugField } from '../fields/slugField'
import { seoFields } from '../fields/seoFields'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'duration', 'isPopular', 'isActive'],
    group: 'Healthcare',
    description: 'Medical tourism packages displayed on the frontend',
  },
  versions: { drafts: true },
  access: {
    read: publishedOnly,
    create: isAdminOrSalesAgent,
    update: isAdminOrSalesAgent,
    delete: isAdmin,
  },
  fields: [
    // === BASIC INFO ===
    { name: 'name', type: 'text', required: true, label: 'Package Name' },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      maxLength: 300,
      admin: { description: 'Shown on package cards' },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      label: 'Full Description',
    },

    // === CATEGORY ===
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Orthopedics', value: 'orthopedics' },
        { label: 'Surgery', value: 'surgery' },
        { label: 'Ophthalmology', value: 'ophthalmology' },
        { label: 'Dermatology', value: 'dermatology' },
        { label: 'Cardiology', value: 'cardiology' },
        { label: 'Hair Transplant', value: 'hair' },
        { label: 'Dental', value: 'dental' },
        { label: 'Bariatric', value: 'bariatric' },
        { label: 'IVF / Fertility', value: 'ivf' },
        { label: 'Health Check-up', value: 'checkup' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'treatmentCategory',
      type: 'relationship',
      relationTo: 'treatment-categories',
      label: 'Linked Treatment',
      admin: { description: 'Link to detailed treatment category' },
    },
    {
      name: 'specialities',
      type: 'select',
      hasMany: true,
      label: 'Related Specialities',
      admin: {
        description: 'Select doctor specialities related to this package (used to show relevant doctors on detail page)',
        position: 'sidebar',
      },
      options: [
        { label: 'Orthopedics', value: 'ORTHOPEDICS' },
        { label: 'Cardiology', value: 'CARDIOLOGY' },
        { label: 'Ophthalmology', value: 'OPHTHALMOLOGY' },
        { label: 'Dentistry', value: 'DENTISTRY' },
        { label: 'Plastic Surgery', value: 'PLASTIC_SURGERY' },
        { label: 'Hair Transplant', value: 'HAIR_TRANSPLANT' },
        { label: 'Bariatric Surgery', value: 'BARIATRIC_SURGERY' },
        { label: 'Dermatology', value: 'DERMATOLOGY' },
      ],
    },

    // === PRICING ===
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Starting Price ($)',
      min: 0,
    },
    {
      name: 'originalPrice',
      type: 'number',
      label: 'Original Price ($)',
      admin: { description: 'For showing discount (crossed out price)' },
    },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'USD',
      options: [
        { label: 'USD ($)', value: 'USD' },
        { label: 'EUR (€)', value: 'EUR' },
        { label: 'GBP (£)', value: 'GBP' },
      ],
      admin: { position: 'sidebar' },
    },

    // === DURATION ===
    {
      name: 'durationNights',
      type: 'number',
      required: true,
      label: 'Nights',
      min: 0,
    },
    {
      name: 'durationDays',
      type: 'number',
      required: true,
      label: 'Days',
      min: 1,
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration Display',
      admin: { 
        readOnly: true,
        description: 'Auto-generated: "5 Nights / 6 Days"' 
      },
      hooks: {
        beforeValidate: [
          ({ siblingData }) => {
            const nights = siblingData?.durationNights || 0
            const days = siblingData?.durationDays || 1
            return `${nights} Nights / ${days} Days`
          },
        ],
      },
    },

    // === MEDIA ===
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: false, label: 'Cover Image' },
    { name: 'coverImageUrl', type: 'text', label: 'Cover Image URL', admin: { description: 'Alternatif: Harici görsel URL' } },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },

    // === INCLUDES ===
    {
      name: 'includes',
      type: 'array',
      required: true,
      label: 'Package Includes',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'description', type: 'text', label: 'Description' },
        { 
          name: 'icon', 
          type: 'select',
          defaultValue: 'check',
          options: [
            { label: 'Check', value: 'check' },
            { label: 'Medical', value: 'medical' },
            { label: 'Hotel', value: 'hotel' },
            { label: 'Transfer', value: 'transfer' },
            { label: 'Flight', value: 'flight' },
            { label: 'Doctor', value: 'doctor' },
          ],
        },
      ],
    },
    {
      name: 'excludes',
      type: 'array',
      label: 'Package Excludes',
      fields: [
        { name: 'item', type: 'text', required: true },
      ],
    },

    // === PROCESS STEPS ===
    {
      name: 'process',
      type: 'array',
      label: 'Treatment Process',
      admin: { description: 'Day-by-day journey' },
      fields: [
        { name: 'day', type: 'text', required: true, label: 'Day/Step', admin: { description: 'e.g. "1. Gün", "Day 1-2"' } },
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'description', type: 'textarea', label: 'Description' },
      ],
    },

    // === RELATED ===
    {
      name: 'relatedDoctors',
      type: 'relationship',
      relationTo: 'doctor-profiles',
      hasMany: true,
      label: 'Related Doctors',
    },
    {
      name: 'recommendedHotels',
      type: 'relationship',
      relationTo: 'hotels',
      hasMany: true,
      label: 'Recommended Hotels',
    },

    // === TRANSPORT ===
    {
      name: 'transport',
      type: 'group',
      label: 'Transport & Options',
      fields: [
        {
          name: 'hotelIncluded',
          type: 'checkbox',
          label: 'Hotel Included',
          defaultValue: true,
        },
        {
          name: 'hotelDescription',
          type: 'text',
          label: 'Hotel Description',
          admin: { description: 'e.g. "5 Nights, 5-star hotel near hospital"' },
        },
        {
          name: 'flightOption',
          type: 'select',
          label: 'Flight Option',
          options: [
            { label: 'Not Included', value: 'not-included' },
            { label: 'Included', value: 'included' },
            { label: 'Customizable', value: 'customizable' },
          ],
          defaultValue: 'customizable',
        },
        {
          name: 'flightDescription',
          type: 'text',
          label: 'Flight Description',
          admin: { description: 'e.g. "Economy class, round-trip ticket"' },
        },
        {
          name: 'transferIncluded',
          type: 'checkbox',
          label: 'Local Transfers Included',
          defaultValue: true,
        },
        {
          name: 'transferDescription',
          type: 'text',
          label: 'Transfer Description',
          admin: { description: 'e.g. "Airport to hotel/hospital, private vehicle"' },
        },
      ],
    },

    // === FAQs ===
    {
      name: 'faqs',
      type: 'array',
      label: 'Package FAQs',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },

    // === FLAGS ===
    { name: 'isPopular', type: 'checkbox', label: 'Popular', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isFeatured', type: 'checkbox', label: 'Featured', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isActive', type: 'checkbox', label: 'Active', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', label: 'Sort Order', defaultValue: 0, admin: { position: 'sidebar' } },

    ...seoFields,
  ],
}
