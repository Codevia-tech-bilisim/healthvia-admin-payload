import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSalesAgent } from '../access/roles'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  admin: {
    useAsTitle: 'patientName',
    defaultColumns: ['patientName', 'doctor', 'appointmentDate', 'consultationType', 'status'],
    group: 'Appointment Management',
    description: 'Quick appointment overview (operational data lives in Spring Boot)',
  },
  access: {
    read: isAdminOrSalesAgent,
    create: isAdminOrSalesAgent,
    update: isAdminOrSalesAgent,
    delete: isAdmin,
  },
  fields: [
    { name: 'patientName', type: 'text', required: true, label: 'Patient Name' },
    { name: 'patientEmail', type: 'email', required: true, label: 'Email' },
    { name: 'patientPhone', type: 'text', required: true, label: 'Phone' },
    { name: 'doctor', type: 'relationship', relationTo: 'doctor-profiles', required: true, label: 'Doctor' },
    {
      name: 'appointmentDate',
      type: 'date',
      required: true,
      label: 'Date & Time',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'consultationType',
      type: 'select',
      defaultValue: 'IN_PERSON',
      label: 'Consultation Type',
      options: [
        { label: 'In Person', value: 'IN_PERSON' },
        { label: 'Video Call (Online)', value: 'VIDEO_CALL' },
        { label: 'Phone Call', value: 'PHONE_CALL' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'PENDING',
      label: 'Status',
      options: [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Confirmed', value: 'CONFIRMED' },
        { label: 'Completed', value: 'COMPLETED' },
        { label: 'Cancelled', value: 'CANCELLED' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', type: 'textarea', label: 'Notes' },
  ],
}
