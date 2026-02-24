import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Settings',
    description: 'Footer area — links, contact summary, legal',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      maxRows: 5,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Column Title' },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          maxRows: 8,
          fields: [
            { name: 'label', type: 'text', required: true },
            {
              name: 'type',
              type: 'select',
              defaultValue: 'custom',
              options: [
                { label: 'Internal Page', value: 'internal' },
                { label: 'Custom URL', value: 'custom' },
              ],
            },
            { name: 'page', type: 'relationship', relationTo: 'pages', admin: { condition: (data, siblingData) => siblingData?.type === 'internal' } },
            { name: 'url', type: 'text', admin: { condition: (data, siblingData) => siblingData?.type === 'custom' } },
          ],
        },
      ],
    },
    {
      name: 'bottomBar',
      type: 'group',
      label: 'Bottom Bar',
      fields: [
        { name: 'copyright', type: 'text', label: 'Copyright Text', defaultValue: '© 2025 HealthVia. All rights reserved.' },
        {
          name: 'legalLinks',
          type: 'array',
          label: 'Legal Links',
          maxRows: 5,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'page', type: 'relationship', relationTo: 'pages' },
          ],
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter',
      fields: [
        { name: 'isEnabled', type: 'checkbox', label: 'Show Newsletter Form', defaultValue: true },
        { name: 'title', type: 'text', label: 'Title', defaultValue: 'Stay Updated' },
        { name: 'description', type: 'text', label: 'Description', defaultValue: 'Subscribe to our newsletter for latest health tourism insights.' },
      ],
    },
  ],
}
