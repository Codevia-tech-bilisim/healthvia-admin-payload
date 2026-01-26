import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Kullanıcı Yönetimi',
  },
  fields: [
    { name: 'firstName', type: 'text', required: true, label: 'Ad' },
    { name: 'lastName', type: 'text', required: true, label: 'Soyad' },
    { name: 'phone', type: 'text', label: 'Telefon' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'sales-agent',
      label: 'Rol',
      options: [
        { label: 'Süper Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Satış Temsilcisi', value: 'sales-agent' },
        { label: 'Doktor', value: 'doctor' },
      ],
    },
  ],
}
