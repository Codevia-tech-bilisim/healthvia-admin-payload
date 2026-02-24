import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header / Navigation',
  admin: {
    group: 'Settings',
    description: 'Top menu and navigation links',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Menu Items',
      maxRows: 10,
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Display Text' },
        {
          name: 'type',
          type: 'select',
          required: true,
          label: 'Link Type',
          defaultValue: 'internal',
          options: [
            { label: 'Internal Page', value: 'internal' },
            { label: 'External Link', value: 'external' },
            { label: 'Custom URL', value: 'custom' },
          ],
        },
        { name: 'page', type: 'relationship', relationTo: 'pages', label: 'Page', admin: { condition: (data, siblingData) => siblingData?.type === 'internal' } },
        { name: 'url', type: 'text', label: 'URL', admin: { condition: (data, siblingData) => siblingData?.type === 'external' || siblingData?.type === 'custom' } },
        { name: 'openInNewTab', type: 'checkbox', label: 'Open in New Tab', defaultValue: false },
        {
          name: 'children',
          type: 'array',
          label: 'Submenu',
          maxRows: 8,
          fields: [
            { name: 'label', type: 'text', required: true, label: 'Display Text' },
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'custom',
              options: [
                { label: 'Internal Page', value: 'internal' },
                { label: 'External Link', value: 'external' },
                { label: 'Custom URL', value: 'custom' },
              ],
            },
            { name: 'page', type: 'relationship', relationTo: 'pages', admin: { condition: (data, siblingData) => siblingData?.type === 'internal' } },
            { name: 'url', type: 'text', admin: { condition: (data, siblingData) => siblingData?.type === 'external' || siblingData?.type === 'custom' } },
            { name: 'description', type: 'text', label: 'Description', admin: { description: 'Short description for mega menu' } },
            { name: 'icon', type: 'text', label: 'Icon', admin: { description: 'Lucide icon name' } },
          ],
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      admin: { description: 'Action button on the top right (e.g. "Get Free Consultation")' },
      fields: [
        { name: 'label', type: 'text', label: 'Button Text', defaultValue: 'Get Free Consultation' },
        { name: 'url', type: 'text', label: 'URL', defaultValue: '/contact' },
        { name: 'isVisible', type: 'checkbox', label: 'Visible', defaultValue: true },
      ],
    },
    { name: 'showLanguageSwitcher', type: 'checkbox', label: 'Show Language Switcher', defaultValue: true },
  ],
}
