import type { CollectionConfig } from 'payload'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  admin: {
    useAsTitle: 'patientName',
    group: 'Randevu Yönetimi',
  },
  fields: [
    { name: 'patientName', type: 'text', required: true, label: 'Hasta Adı' },
    { name: 'patientEmail', type: 'email', required: true, label: 'E-posta' },
    { name: 'patientPhone', type: 'text', required: true, label: 'Telefon' },
    { name: 'doctor', type: 'relationship', relationTo: 'doctors', required: true, label: 'Doktor' },
    { 
      name: 'appointmentDate', 
      type: 'date', 
      required: true, 
      label: 'Tarih',
      admin: { date: { pickerAppearance: 'dayAndTime' } }
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'PENDING',
      label: 'Durum',
      options: [
        { label: 'Beklemede', value: 'PENDING' },
        { label: 'Onaylandı', value: 'CONFIRMED' },
        { label: 'Tamamlandı', value: 'COMPLETED' },
        { label: 'İptal', value: 'CANCELLED' },
      ],
    },
    { name: 'notes', type: 'textarea', label: 'Notlar' },
  ],
}
