import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSalesAgent, publishedOnly } from '../access/roles'

export const Flights: CollectionConfig = {
  slug: 'flights',
  admin: {
    useAsTitle: 'routeDisplay',
    defaultColumns: ['routeDisplay', 'airline', 'departureDate', 'price', 'isActive'],
    group: 'Travel & Accommodation',
    description: 'Flight options and routes for medical tourists',
  },
  access: {
    read: publishedOnly,
    create: isAdminOrSalesAgent,
    update: isAdminOrSalesAgent,
    delete: isAdmin,
  },
  fields: [
    // === DISPLAY FIELD (auto-generated) ===
    {
      name: 'routeDisplay',
      type: 'text',
      label: 'Route',
      admin: {
        readOnly: true,
        description: 'Auto-generated: "London (LHR) → Istanbul (IST)"',
      },
      hooks: {
        beforeValidate: [
          ({ siblingData }) => {
            const dep = siblingData?.departure?.airportCode || '???'
            const arr = siblingData?.arrival?.airportCode || '???'
            const depCity = siblingData?.departure?.city || ''
            const arrCity = siblingData?.arrival?.city || ''
            return `${depCity} (${dep}) → ${arrCity} (${arr})`
          },
        ],
      },
    },

    // === AIRLINE ===
    { name: 'airline', type: 'text', required: true, label: 'Airline', admin: { description: 'e.g. "Turkish Airlines", "Pegasus"' } },
    { name: 'airlineLogo', type: 'upload', relationTo: 'media', label: 'Airline Logo' },
    { name: 'flightNumber', type: 'text', label: 'Flight Number', admin: { description: 'e.g. "TK1234"' } },

    // === DEPARTURE ===
    {
      name: 'departure',
      type: 'group',
      label: 'Departure',
      fields: [
        { name: 'city', type: 'text', required: true, label: 'City' },
        { name: 'airport', type: 'text', required: true, label: 'Airport Name', admin: { description: 'e.g. "Heathrow Airport"' } },
        { name: 'airportCode', type: 'text', required: true, label: 'Airport Code (IATA)', admin: { description: 'e.g. "LHR", "CDG", "JFK"' } },
        { name: 'country', type: 'text', label: 'Country' },
      ],
    },

    // === ARRIVAL ===
    {
      name: 'arrival',
      type: 'group',
      label: 'Arrival',
      fields: [
        { name: 'city', type: 'text', required: true, label: 'City', defaultValue: 'Istanbul' },
        { name: 'airport', type: 'text', required: true, label: 'Airport Name', defaultValue: 'Istanbul Airport' },
        { name: 'airportCode', type: 'text', required: true, label: 'Airport Code (IATA)', defaultValue: 'IST' },
        { name: 'country', type: 'text', label: 'Country', defaultValue: 'Turkey' },
      ],
    },

    // === SCHEDULE ===
    {
      name: 'schedule',
      type: 'group',
      label: 'Schedule',
      fields: [
        { name: 'departureTime', type: 'text', required: true, label: 'Departure Time', admin: { description: 'e.g. "08:30", "14:45"' } },
        { name: 'arrivalTime', type: 'text', required: true, label: 'Arrival Time' },
        { name: 'duration', type: 'text', required: true, label: 'Duration', admin: { description: 'e.g. "3h 45m"' } },
        {
          name: 'stops',
          type: 'select',
          defaultValue: '0',
          label: 'Stops',
          options: [
            { label: 'Direct', value: '0' },
            { label: '1 Stop', value: '1' },
            { label: '2 Stops', value: '2' },
          ],
        },
        { name: 'stopoverCity', type: 'text', label: 'Stopover City', admin: { condition: (data, siblingData) => siblingData?.stops !== '0' } },
      ],
    },

    // === FREQUENCY (hangi günler uçuş var) ===
    {
      name: 'operatingDays',
      type: 'select',
      hasMany: true,
      label: 'Operating Days',
      options: [
        { label: 'Monday', value: 'mon' },
        { label: 'Tuesday', value: 'tue' },
        { label: 'Wednesday', value: 'wed' },
        { label: 'Thursday', value: 'thu' },
        { label: 'Friday', value: 'fri' },
        { label: 'Saturday', value: 'sat' },
        { label: 'Sunday', value: 'sun' },
      ],
      admin: { description: 'Which days does this flight operate?' },
    },

    // === PRICING ===
    {
      name: 'pricing',
      type: 'group',
      label: 'Pricing',
      fields: [
        { name: 'economy', type: 'number', label: 'Economy ($)' },
        { name: 'business', type: 'number', label: 'Business ($)' },
        { name: 'first', type: 'number', label: 'First Class ($)' },
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
        { name: 'priceNote', type: 'text', label: 'Note', admin: { description: 'e.g. "Prices start from", "Luggage included"' } },
      ],
    },

    // === LUGGAGE ===
    {
      name: 'luggage',
      type: 'group',
      label: 'Luggage Allowance',
      fields: [
        { name: 'cabin', type: 'text', label: 'Cabin Baggage', defaultValue: '8 kg' },
        { name: 'checked', type: 'text', label: 'Checked Baggage', defaultValue: '20 kg' },
      ],
    },

    // === BOOKING ===
    {
      name: 'bookingUrl',
      type: 'text',
      label: 'Booking URL',
      admin: { description: 'Direct link to book this flight (airline site, travel agent, etc.)' },
    },

    // === VALIDITY PERIOD ===
    {
      name: 'validFrom',
      type: 'date',
      label: 'Valid From',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'validTo',
      type: 'date',
      label: 'Valid Until',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },

    // === FLAGS ===
    { name: 'isPartnerAirline', type: 'checkbox', label: 'Partner Airline', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isFeatured', type: 'checkbox', label: 'Featured', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isActive', type: 'checkbox', label: 'Active', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', label: 'Sort Order', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
