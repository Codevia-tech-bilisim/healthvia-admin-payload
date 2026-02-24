import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSalesAgent, publishedOnly } from '../access/roles'
import { slugField } from '../fields/slugField'
import { seoFields } from '../fields/seoFields'

export const Doctors: CollectionConfig = {
  slug: 'doctor-profiles',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'title', 'specialty', 'hospital', 'isActive'],
    group: 'Doctor Management',
    description: 'Doctor profiles displayed on the patient-facing website',
  },
  versions: { drafts: true },
  access: {
    read: publishedOnly,
    create: isAdminOrSalesAgent,
    update: isAdminOrSalesAgent,
    delete: isAdmin,
  },
  fields: [
    // === IDENTITY ===
    {
      name: 'title',
      type: 'select',
      required: true,
      label: 'Title',
      options: [
        { label: 'Prof. Dr.', value: 'prof-dr' },
        { label: 'Doç. Dr.', value: 'doc-dr' },
        { label: 'Op. Dr.', value: 'op-dr' },
        { label: 'Uzm. Dr.', value: 'uzm-dr' },
        { label: 'Dr.', value: 'dr' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'fullName', type: 'text', required: true, label: 'Full Name' },
    slugField('fullName'),
    { name: 'email', type: 'email', required: true, label: 'Email' },
    { name: 'phone', type: 'text', label: 'Phone' },

    // === PROFESSIONAL ===
    {
      name: 'specialty',
      type: 'relationship',
      relationTo: 'treatment-categories',
      hasMany: true,
      label: 'Specialties',
      admin: { description: 'Link to treatment categories this doctor performs' },
    },
    {
      name: 'specialtyText',
      type: 'text',
      label: 'Specialty (Display)',
      admin: { description: 'e.g. "Orthopedic Surgeon", "Cardiologist" — shown on cards' },
    },
    {
      name: 'experience',
      type: 'number',
      label: 'Years of Experience',
      min: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'education',
      type: 'array',
      label: 'Education & Certifications',
      fields: [
        { name: 'degree', type: 'text', required: true, label: 'Degree / Certificate' },
        { name: 'institution', type: 'text', required: true, label: 'University / Institution' },
        { name: 'year', type: 'number', label: 'Year' },
      ],
    },
    {
      name: 'languages',
      type: 'select',
      hasMany: true,
      label: 'Languages',
      options: [
        { label: 'Turkish', value: 'tr' },
        { label: 'English', value: 'en' },
        { label: 'German', value: 'de' },
        { label: 'Arabic', value: 'ar' },
        { label: 'French', value: 'fr' },
        { label: 'Russian', value: 'ru' },
        { label: 'Spanish', value: 'es' },
        { label: 'Dutch', value: 'nl' },
      ],
      admin: { position: 'sidebar' },
    },

    // === HOSPITAL / CLINIC ===
    {
      name: 'hospital',
      type: 'relationship',
      relationTo: 'partners',
      label: 'Hospital / Clinic',
      admin: { description: 'Where this doctor practices' },
    },
    { name: 'hospitalName', type: 'text', label: 'Hospital Name (Manual)', admin: { description: 'Use if hospital is not in Partners list' } },
    { name: 'city', type: 'text', label: 'City', admin: { position: 'sidebar' } },

    // === MEDIA ===
    { name: 'profilePhoto', type: 'upload', relationTo: 'media', label: 'Profile Photo' },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },

    // === BIO & CONTENT ===
    {
      name: 'shortBio',
      type: 'textarea',
      label: 'Short Bio',
      maxLength: 300,
      admin: { description: 'Shown on doctor cards' },
    },
    {
      name: 'biography',
      type: 'richText',
      label: 'Full Biography',
    },

    // === PRICING ===
    {
      name: 'consultationFee',
      type: 'number',
      label: 'Consultation Fee ($)',
      min: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'consultationTypes',
      type: 'select',
      hasMany: true,
      label: 'Consultation Types',
      options: [
        { label: 'In-Person', value: 'in-person' },
        { label: 'Video Call', value: 'video' },
        { label: 'Phone', value: 'phone' },
        { label: 'Chat', value: 'chat' },
      ],
    },

    // === RATINGS ===
    {
      name: 'ratings',
      type: 'group',
      label: 'Ratings',
      admin: { description: 'Patient satisfaction data' },
      fields: [
        { name: 'overall', type: 'number', label: 'Overall Rating', min: 0, max: 5 },
        { name: 'reviewCount', type: 'number', label: 'Number of Reviews' },
        { name: 'successRate', type: 'text', label: 'Success Rate', admin: { description: 'e.g. "98%"' } },
        { name: 'patientsServed', type: 'text', label: 'Total Patients', admin: { description: 'e.g. "2,500+"' } },
      ],
    },

    // === SPRING BOOT LINK ===
    {
      name: 'backendDoctorId',
      type: 'text',
      label: 'Backend Doctor ID',
      admin: {
        position: 'sidebar',
        description: 'MongoDB _id from Spring Boot doctors collection. Links this profile to the operational doctor record.',
      },
    },

    // === FLAGS ===
    { name: 'isActive', type: 'checkbox', label: 'Active', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'isFeatured', type: 'checkbox', label: 'Featured', defaultValue: false, admin: { position: 'sidebar', description: 'Show on homepage?' } },
    { name: 'availableForOnline', type: 'checkbox', label: 'Available for Online Consultation', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', label: 'Sort Order', defaultValue: 0, admin: { position: 'sidebar' } },

    ...seoFields,
  ],
}
