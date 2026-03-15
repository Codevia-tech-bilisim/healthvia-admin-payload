import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { gcsStorage } from '@payloadcms/storage-gcs'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'

// === CORE ===
import { Users } from './collections/Users'
import { Media } from './collections/Media'

// === HEALTHCARE ===
import { Doctors } from './collections/Doctors'
import { Packages } from './collections/Packages'
import { TreatmentCategories } from './collections/TreatmentCategories'
import { Partners } from './collections/Partners'

// === TRAVEL ===
import { Hotels } from './collections/Hotels'
import { Flights } from './collections/Flights'

// === CONTENT ===
import { BlogPosts } from './collections/BlogPosts'
import { Testimonials } from './collections/Testimonials'
import { FAQs } from './collections/FAQs'

// === GLOBALS ===
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' — HealthVia Admin',
    },
  },
  collections: [
    Users,
    Media,
    Doctors,
    Packages,
    TreatmentCategories,
    Partners,
    Hotels,
    Flights,
    BlogPosts,
    Testimonials,
    FAQs,
  ],
  globals: [
    SiteSettings,
  ],
  cors: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:8080',
    'https://healthviatech.website',
    'https://www.healthviatech.website',
    'https://api.healthviatech.website',
    'https://admin.healthviatech.website',
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
  sharp,
  plugins: [
    gcsStorage({
      collections: {
        media: true,
      },
      bucket: process.env.GCS_BUCKET || 'healthvia-media',
      options: {
        projectId: process.env.GCP_PROJECT_ID || 'healthvia-beta',
      },
    }),
  ],
})
