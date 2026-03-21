import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSalesAgent } from '../access/roles'

export const Doctors: CollectionConfig = {
  slug: 'doctor-profiles',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'title', 'primarySpecialty', 'hospitalName', 'backendDoctorId', 'isActive'],
    group: 'Healthcare',
  },
  access: {
    read: () => true,
    create: isAdminOrSalesAgent,
    update: isAdminOrSalesAgent,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && data.password && !data.backendDoctorId) {
          try {
            const nameParts = data.fullName.trim().split(' ')
            const firstName = nameParts[0]
            const lastName = nameParts.slice(1).join(' ') || nameParts[0]

            const res = await fetch(`${process.env.BACKEND_API_URL || 'https://api.healthviatech.website'}/api/auth/register/doctor`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                firstName,
                lastName,
                email: data.email,
                password: data.password,
                phone: data.phone,
                role: 'DOCTOR',
                gdprConsent: true,
                birthPlace: 'Turkey',
                diplomaNumber: data.diplomaNumber,
                medicalLicenseNumber: data.medicalLicenseNumber,
                medicalSchool: data.medicalSchool || 'Belirtilmedi',
                graduationYear: data.graduationYear || 2010,
                primarySpecialty: data.primarySpecialty,
                yearsOfExperience: data.experience || 5,
                currentHospital: data.hospitalName,
              }),
            })

            const result = await res.json()

            if (result.success && result.data?.userId) {
              data.backendDoctorId = result.data.userId
              console.log(`✅ Doctor synced: ${data.fullName} → ${result.data.userId}`)
            } else {
              console.error(`❌ Sync failed:`, JSON.stringify(result))
            }
          } catch (err) {
            console.error(`❌ Sync error:`, err)
          }
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        // Sync updates to backend when doctor is edited (not on initial create — that's handled by beforeChange)
        if (operation === 'update' && doc.backendDoctorId) {
          try {
            const backendUrl = process.env.BACKEND_API_URL || 'https://api.healthviatech.website'
            const apiKey = process.env.PAYLOAD_SYNC_API_KEY || ''

            if (!apiKey) {
              console.error('❌ PAYLOAD_SYNC_API_KEY env var not set — skipping backend sync')
              return
            }

            const params = new URLSearchParams()

            if (doc.hospitalName) params.set('hospitalName', doc.hospitalName)
            if (doc.primarySpecialty) params.set('primarySpecialty', doc.primarySpecialty)
            if (doc.shortBio) params.set('shortBio', doc.shortBio)
            if (doc.experience) params.set('yearsOfExperience', String(doc.experience))

            const res = await fetch(
              `${backendUrl}/api/doctors/${doc.backendDoctorId}/sync?${params.toString()}`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Payload-API-Key': apiKey,
                },
              },
            )

            if (res.ok) {
              console.log(`✅ Doctor update synced: ${doc.fullName} → backend`)
            } else {
              const errorText = await res.text()
              console.error(`❌ Doctor update sync failed (${res.status}):`, errorText)
            }
          } catch (err) {
            console.error(`❌ Doctor update sync error:`, err)
          }
        }
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'select',
          required: true,
          label: 'Unvan',
          options: [
            { label: 'Prof. Dr.', value: 'prof-dr' },
            { label: 'Doç. Dr.', value: 'doc-dr' },
            { label: 'Op. Dr.', value: 'op-dr' },
            { label: 'Uzm. Dr.', value: 'uzm-dr' },
            { label: 'Dr.', value: 'dr' },
          ],
          defaultValue: 'uzm-dr',
        },
        { name: 'fullName', type: 'text', required: true, label: 'Ad Soyad' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, unique: true, label: 'Email' },
        { name: 'phone', type: 'text', required: true, unique: true, label: 'Telefon' },
      ],
    },
    { name: 'password', type: 'text', required: true, label: 'Şifre' },
    {
      type: 'row',
      fields: [
        { name: 'diplomaNumber', type: 'text', required: true, unique: true, label: 'Diploma No' },
        { name: 'medicalLicenseNumber', type: 'text', required: true, unique: true, label: 'Sicil No' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'medicalSchool', type: 'text', label: 'Tıp Fakültesi' },
        { name: 'graduationYear', type: 'number', label: 'Mezuniyet Yılı' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'primarySpecialty',
          type: 'select',
          required: true,
          label: 'Uzmanlık',
          options: [
            { label: 'Ortopedi', value: 'ORTHOPEDICS' },
            { label: 'Kardiyoloji', value: 'CARDIOLOGY' },
            { label: 'Göz Hastalıkları', value: 'OPHTHALMOLOGY' },
            { label: 'Diş Hekimliği', value: 'DENTISTRY' },
            { label: 'Plastik Cerrahi', value: 'PLASTIC_SURGERY' },
            { label: 'Saç Ekimi', value: 'HAIR_TRANSPLANT' },
            { label: 'Bariatrik Cerrahi', value: 'BARIATRIC_SURGERY' },
            { label: 'Dermatoloji', value: 'DERMATOLOGY' },
          ],
        },
        { name: 'experience', type: 'number', label: 'Deneyim (Yıl)' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'hospitalName', type: 'text', required: true, label: 'Hastane' },
        {
          name: 'city',
          type: 'select',
          label: 'Şehir',
          defaultValue: 'Istanbul',
          options: [
            { label: 'İstanbul', value: 'Istanbul' },
            { label: 'Ankara', value: 'Ankara' },
            { label: 'İzmir', value: 'Izmir' },
            { label: 'Antalya', value: 'Antalya' },
          ],
        },
      ],
    },
    { name: 'profilePhoto', type: 'upload', relationTo: 'media', label: 'Fotoğraf' },
    { name: 'profilePhotoUrl', type: 'text', label: 'Profil Fotoğrafı URL' },
    { name: 'shortBio', type: 'textarea', label: 'Kısa Bio', maxLength: 300 },
    {
      name: 'languages',
      type: 'select',
      hasMany: true,
      label: 'Diller',
      defaultValue: ['tr'],
      options: [
        { label: 'Türkçe', value: 'tr' },
        { label: 'İngilizce', value: 'en' },
        { label: 'Almanca', value: 'de' },
        { label: 'Arapça', value: 'ar' },
        { label: 'Rusça', value: 'ru' },
      ],
    },
    { name: 'consultationFee', type: 'number', label: 'Muayene Ücreti ($)' },
    { name: 'rating', type: 'number', label: 'Puan', min: 0, max: 5 },
    { name: 'reviewCount', type: 'number', label: 'Değerlendirme Sayısı' },
    { name: 'backendDoctorId', type: 'text', label: 'Backend ID', admin: { position: 'sidebar', readOnly: true } },
    { name: 'isActive', type: 'checkbox', label: 'Aktif', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'isFeatured', type: 'checkbox', label: 'Öne Çıkan', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'availableForOnline', type: 'checkbox', label: 'Online', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
