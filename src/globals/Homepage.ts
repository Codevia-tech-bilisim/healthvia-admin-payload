import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Settings',
    description: 'Homepage sections — Hero, features, stats, CTA',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Title', defaultValue: 'Your Health Journey Starts Here' },
        { name: 'subtitle', type: 'textarea', label: 'Subtitle', defaultValue: "Connect with Turkey's top doctors. Get world-class treatment at affordable prices." },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Background Image' },
        { name: 'backgroundVideo', type: 'text', label: 'Background Video URL', admin: { description: 'Video to play in hero area (optional)' } },
        {
          name: 'primaryCta',
          type: 'group',
          label: 'Primary Button',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Get Free Consultation' },
            { name: 'url', type: 'text', defaultValue: '/contact' },
          ],
        },
        {
          name: 'secondaryCta',
          type: 'group',
          label: 'Secondary Button',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Explore Treatments' },
            { name: 'url', type: 'text', defaultValue: '/treatments' },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      maxRows: 6,
      admin: { description: 'Key numbers (e.g. "10,000+ Patients", "50+ Doctors")' },
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value', admin: { description: 'e.g. "10,000+", "98%"' } },
        { name: 'label', type: 'text', required: true, label: 'Label', admin: { description: 'e.g. "Happy Patients", "Success Rate"' } },
        { name: 'icon', type: 'text', label: 'Icon', admin: { description: 'Lucide icon name' } },
      ],
    },
    {
      name: 'howItWorks',
      type: 'group',
      label: 'How It Works',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'How It Works' },
        { name: 'subtitle', type: 'text', defaultValue: 'Your journey to better health in 4 simple steps' },
        {
          name: 'steps',
          type: 'array',
          maxRows: 6,
          fields: [
            { name: 'step', type: 'number', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'icon', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'featuredTreatments',
      type: 'group',
      label: 'Featured Treatments',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Our Treatments' },
        { name: 'subtitle', type: 'text', defaultValue: 'World-class medical procedures at competitive prices' },
        { name: 'treatments', type: 'relationship', relationTo: 'treatment-categories', hasMany: true, label: 'Treatments', admin: { description: 'Select treatments to display on homepage (max 6)' } },
      ],
    },
    {
      name: 'whyUs',
      type: 'group',
      label: 'Why Choose Us',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Why Choose HealthVia?' },
        {
          name: 'features',
          type: 'array',
          maxRows: 8,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'icon', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'testimonialSection',
      type: 'group',
      label: 'Testimonials Section',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'What Our Patients Say' },
        { name: 'subtitle', type: 'text', defaultValue: 'Real stories from real patients' },
        {
          name: 'displayMode',
          type: 'select',
          defaultValue: 'featured',
          options: [
            { label: 'Show featured', value: 'featured' },
            { label: 'Manual selection', value: 'manual' },
            { label: 'Latest', value: 'latest' },
          ],
        },
        { name: 'selectedTestimonials', type: 'relationship', relationTo: 'testimonials', hasMany: true, admin: { condition: (data) => data?.testimonialSection?.displayMode === 'manual' } },
      ],
    },
    {
      name: 'partnerSection',
      type: 'group',
      label: 'Partner Logos',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Trusted By Leading Hospitals' },
        { name: 'isVisible', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'bottomCta',
      type: 'group',
      label: 'Bottom CTA Section',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Ready to Start Your Health Journey?' },
        { name: 'description', type: 'textarea', defaultValue: "Get a free consultation with our medical advisors. We'll help you every step of the way." },
        { name: 'ctaLabel', type: 'text', defaultValue: 'Get Started Now' },
        { name: 'ctaUrl', type: 'text', defaultValue: '/contact' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
