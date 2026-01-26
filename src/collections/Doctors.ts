import type { CollectionConfig } from 'payload'

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  admin: {
    useAsTitle: 'fullName',
    group: 'Doktor Yönetimi',
  },
  fields: [
    { name: 'fullName', type: 'text', required: true, label: 'Ad Soyad' },
    { name: 'email', type: 'email', required: true, label: 'E-posta' },
    { name: 'phone', type: 'text', label: 'Telefon' },
    { name: 'specialty', type: 'text', required: true, label: 'Uzmanlık' },
    { name: 'biography', type: 'textarea', label: 'Biyografi' },
    { name: 'consultationFee', type: 'number', label: 'Ücret (USD)', min: 0 },
    { name: 'isActive', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'profilePhoto', type: 'upload', relationTo: 'media', label: 'Fotoğraf' },
  ],
}
