import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSalesAgent, publishedOnly } from '../access/roles'
import { slugField } from '../fields/slugField'
import { seoFields } from '../fields/seoFields'

export const Hotels: CollectionConfig = {
  slug: 'hotels',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'starRating', 'pricePerNight', 'isPartner', 'isActive'],
    group: 'Travel & Accommodation',
    description: 'Partner hotels and accommodations for medical tourists',
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
    { name: 'name', type: 'text', required: true, label: 'Hotel Name' },
    slugField('name'),
    {
      name: 'starRating',
      type: 'select',
      required: true,
      label: 'Star Rating',
      options: [
        { label: '⭐⭐⭐ 3 Star', value: '3' },
        { label: '⭐⭐⭐⭐ 4 Star', value: '4' },
        { label: '⭐⭐⭐⭐⭐ 5 Star', value: '5' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Accommodation Type',
      defaultValue: 'hotel',
      options: [
        { label: 'Hotel', value: 'hotel' },
        { label: 'Apart Hotel', value: 'apart-hotel' },
        { label: 'Boutique Hotel', value: 'boutique' },
        { label: 'Recovery Residence', value: 'recovery-residence' },
        { label: 'Hospital Suite', value: 'hospital-suite' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'description', type: 'richText', label: 'Description' },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
      maxLength: 250,
      admin: { description: 'Shown on cards and listings' },
    },

    // === MEDIA ===
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Cover Image' },
    {
      name: 'gallery',
      type: 'array',
      label: 'Photo Gallery',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', label: 'Caption' },
      ],
    },

    // === LOCATION ===
    {
      name: 'location',
      type: 'group',
      label: 'Location',
      fields: [
        { name: 'city', type: 'text', required: true, label: 'City' },
        { name: 'district', type: 'text', label: 'District' },
        { name: 'address', type: 'textarea', label: 'Full Address' },
        { name: 'mapUrl', type: 'text', label: 'Google Maps Link' },
        {
          name: 'coordinates',
          type: 'group',
          label: 'GPS Coordinates',
          fields: [
            { name: 'lat', type: 'number', label: 'Latitude' },
            { name: 'lng', type: 'number', label: 'Longitude' },
          ],
        },
        {
          name: 'distanceToHospital',
          type: 'text',
          label: 'Distance to Hospital',
          admin: { description: 'e.g. "2.5 km", "10 min by car"' },
        },
      ],
    },

    // === PRICING ===
    {
      name: 'pricing',
      type: 'group',
      label: 'Pricing',
      fields: [
        { name: 'pricePerNight', type: 'number', required: true, label: 'Price Per Night ($)' },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'USD',
          options: [
            { label: 'USD ($)', value: 'USD' },
            { label: 'EUR (€)', value: 'EUR' },
            { label: 'TRY (₺)', value: 'TRY' },
            { label: 'GBP (£)', value: 'GBP' },
          ],
        },
        { name: 'discountPercentage', type: 'number', label: 'Discount %', min: 0, max: 100 },
        { name: 'priceNote', type: 'text', label: 'Price Note', admin: { description: 'e.g. "Breakfast included", "Medical patient rate"' } },
      ],
    },

    // === AMENITIES ===
    {
      name: 'amenities',
      type: 'select',
      hasMany: true,
      label: 'Amenities',
      options: [
        { label: 'Free WiFi', value: 'wifi' },
        { label: 'Airport Transfer', value: 'airport-transfer' },
        { label: 'Hospital Transfer', value: 'hospital-transfer' },
        { label: 'Swimming Pool', value: 'pool' },
        { label: 'Spa & Wellness', value: 'spa' },
        { label: 'Gym / Fitness', value: 'gym' },
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Room Service', value: 'room-service' },
        { label: 'Parking', value: 'parking' },
        { label: 'Wheelchair Accessible', value: 'wheelchair' },
        { label: 'Medical Staff On-Site', value: 'medical-staff' },
        { label: 'Pharmacy Nearby', value: 'pharmacy' },
        { label: 'Special Diet Menu', value: 'special-diet' },
        { label: 'Multilingual Staff', value: 'multilingual' },
        { label: '24/7 Reception', value: '24-7-reception' },
        { label: 'Laundry Service', value: 'laundry' },
      ],
    },

    // === ROOM TYPES ===
    {
      name: 'roomTypes',
      type: 'array',
      label: 'Room Types',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Room Name', admin: { description: 'e.g. "Standard Single", "Recovery Suite"' } },
        { name: 'pricePerNight', type: 'number', required: true, label: 'Price ($)' },
        { name: 'maxGuests', type: 'number', label: 'Max Guests', defaultValue: 2 },
        { name: 'description', type: 'textarea', label: 'Room Description' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Room Photo' },
      ],
    },

    // === CONTACT ===
    {
      name: 'contact',
      type: 'group',
      label: 'Contact',
      fields: [
        { name: 'phone', type: 'text', label: 'Phone' },
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'website', type: 'text', label: 'Website' },
        { name: 'bookingUrl', type: 'text', label: 'Booking URL', admin: { description: 'Direct booking link (Booking.com, own site, etc.)' } },
      ],
    },

    // === RATINGS ===
    {
      name: 'ratings',
      type: 'group',
      label: 'Ratings',
      admin: { description: 'Patient satisfaction scores' },
      fields: [
        { name: 'overall', type: 'number', label: 'Overall Rating', min: 0, max: 5 },
        { name: 'cleanliness', type: 'number', label: 'Cleanliness', min: 0, max: 5 },
        { name: 'comfort', type: 'number', label: 'Comfort', min: 0, max: 5 },
        { name: 'location', type: 'number', label: 'Location', min: 0, max: 5 },
        { name: 'reviewCount', type: 'number', label: 'Total Reviews' },
      ],
    },

    // === PARTNER HOSPITAL ===
    {
      name: 'partnerHospitals',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      label: 'Partner Hospitals',
      admin: { description: 'Hospitals this hotel works with' },
    },

    // === FLAGS ===
    { name: 'isPartner', type: 'checkbox', label: 'HealthVia Partner', defaultValue: false, admin: { position: 'sidebar', description: 'Official HealthVia partner hotel' } },
    { name: 'isMedicalFocus', type: 'checkbox', label: 'Medical Tourism Focused', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isFeatured', type: 'checkbox', label: 'Featured', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isActive', type: 'checkbox', label: 'Active', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', label: 'Sort Order', defaultValue: 0, admin: { position: 'sidebar' } },

    ...seoFields,
  ],
}
