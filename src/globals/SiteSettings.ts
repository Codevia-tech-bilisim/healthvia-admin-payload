import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description: 'General site settings, contact info, and social media',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'branding',
      type: 'group',
      label: 'Branding',
      fields: [
        { name: 'siteName', type: 'text', required: true, label: 'Site Name', defaultValue: 'HealthVia' },
        { name: 'tagline', type: 'text', label: 'Tagline', defaultValue: 'Your Health Journey, Our Priority' },
        { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo' },
        { name: 'logoDark', type: 'upload', relationTo: 'media', label: 'Logo (Dark Theme)' },
        { name: 'favicon', type: 'upload', relationTo: 'media', label: 'Favicon' },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email', defaultValue: 'info@healthviatech.website' },
        { name: 'phone', type: 'text', label: 'Phone' },
        { name: 'whatsapp', type: 'text', label: 'WhatsApp Number', admin: { description: 'International format (e.g. +905xxxxxxxxx)' } },
        { name: 'address', type: 'textarea', label: 'Address' },
        { name: 'city', type: 'text', label: 'City', defaultValue: 'Ankara' },
        { name: 'country', type: 'text', label: 'Country', defaultValue: 'Turkey' },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media',
      fields: [
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'twitter', type: 'text', label: 'X (Twitter) URL' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
        { name: 'tiktok', type: 'text', label: 'TikTok URL' },
      ],
    },
    {
      name: 'workingHours',
      type: 'group',
      label: 'Working Hours',
      fields: [
        { name: 'weekdays', type: 'text', label: 'Weekdays', defaultValue: '09:00 - 18:00' },
        { name: 'saturday', type: 'text', label: 'Saturday', defaultValue: '09:00 - 14:00' },
        { name: 'sunday', type: 'text', label: 'Sunday', defaultValue: 'Closed' },
        { name: 'note', type: 'text', label: 'Note', admin: { description: 'e.g. "24/7 WhatsApp support"' } },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      label: 'Default SEO',
      fields: [
        { name: 'title', type: 'text', label: 'Default Site Title', defaultValue: 'HealthVia - Medical Tourism Platform' },
        { name: 'description', type: 'textarea', label: 'Default Meta Description', defaultValue: "Turkey's leading medical tourism platform. Connect with top doctors, manage your health journey seamlessly." },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Default OG Image' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics & Integrations',
      fields: [
        { name: 'googleAnalyticsId', type: 'text', label: 'Google Analytics ID', admin: { description: 'e.g. G-XXXXXXXXXX' } },
        { name: 'googleTagManagerId', type: 'text', label: 'Google Tag Manager ID' },
        { name: 'metaPixelId', type: 'text', label: 'Meta Pixel ID' },
      ],
    },
  ],
}
