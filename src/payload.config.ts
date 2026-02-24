import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'

// === CORE ===
import { Users } from './collections/Users'
import { Media } from './collections/Media'

// === HEALTHCARE ===
import { Doctors } from './collections/Doctors'           // slug: doctor-profiles
import { Appointments } from './collections/Appointments'  // references doctor-profiles
import { TreatmentCategories } from './collections/TreatmentCategories'
import { Partners } from './collections/Partners'

// === TRAVEL ===
import { Hotels } from './collections/Hotels'
import { Flights } from './collections/Flights'

// === CONTENT ===
import { Pages } from './collections/Pages'
import { BlogPosts } from './collections/BlogPosts'
import { Testimonials } from './collections/Testimonials'  // references doctor-profiles
import { FAQs } from './collections/FAQs'

// === GLOBALS ===
import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Homepage } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' — HealthVia Admin',
    },
    components: {
      graphics: {
        Logo: '/components/Logo',
        Icon: '/components/Icon',
      },
      beforeDashboard: ['/components/BeforeDashboard'],
    },
  },
  collections: [
    // Core
    Users,
    Media,

    // Healthcare
    Doctors,           // → MongoDB: "doctor-profiles" (not "doctors")
    Appointments,
    TreatmentCategories,
    Partners,

    // Travel & Accommodation
    Hotels,
    Flights,

    // Content
    Pages,
    BlogPosts,
    Testimonials,
    FAQs,
  ],
  globals: [
    SiteSettings,
    Header,
    Footer,
    Homepage,
  ],

  cors: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080',
    'https://healthviatech.website',
    'https://api.healthviatech.website',
    'https://admin.healthviatech.website',
  ],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
  sharp,
})
