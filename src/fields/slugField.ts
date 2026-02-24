import type { Field } from 'payload'

export const slugField = (sourceField: string = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: `Auto-generated from "${sourceField}". Can also be edited manually.`,
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }
        const source = siblingData?.[sourceField]
        if (typeof source === 'string' && source.length > 0) {
          return formatSlug(source)
        }
        return value
      },
    ],
  },
})

function formatSlug(input: string): string {
  const turkishMap: Record<string, string> = {
    ç: 'c', Ç: 'C', ğ: 'g', Ğ: 'G', ı: 'i', İ: 'I',
    ö: 'o', Ö: 'O', ş: 's', Ş: 'S', ü: 'u', Ü: 'U',
  }
  return input
    .split('')
    .map((char) => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 200)
}
