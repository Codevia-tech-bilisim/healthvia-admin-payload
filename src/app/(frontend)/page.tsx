import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@payload-config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a2b4b 0%, #3E4F6F 50%, #6986AA 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#fff',
        padding: '2rem',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '1.5rem' }}>
        <svg
          width="56"
          height="56"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="8" fill="rgba(255,255,255,0.15)" />
          <path
            d="M10 18C10 18 13 12 18 12C23 12 26 18 26 18C26 18 23 24 18 24C13 24 10 18 10 18Z"
            stroke="#f97316"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="18" cy="18" r="3" fill="#f97316" />
          <path
            d="M18 8V12M18 24V28M8 18H12M24 18H28"
            stroke="#f97316"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          margin: 0,
          letterSpacing: '-0.5px',
        }}
      >
        <span style={{ color: '#f97316' }}>HEALTH</span>VIA
      </h1>

      <p
        style={{
          fontSize: '1.1rem',
          opacity: 0.8,
          marginTop: '0.5rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
        }}
      >
        {user
          ? `Welcome back, ${user.email}`
          : 'Healthcare Tourism Platform — Content Management System'}
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="/admin"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            backgroundColor: '#f97316',
            color: '#fff',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            transition: 'background 0.2s',
          }}
        >
          🔧 Admin Panel
        </a>

        <a
          href="https://api.healthviatech.website/swagger-ui/index.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            backgroundColor: 'rgba(255,255,255,0.12)',
            color: '#fff',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          📋 API Docs
        </a>

        <a
          href="https://healthviatech.website"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            backgroundColor: 'rgba(255,255,255,0.12)',
            color: '#fff',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          🌐 Patient Website
        </a>
      </div>

      {/* API Status Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '3rem',
          maxWidth: '700px',
          width: '100%',
        }}
      >
        {[
          { label: 'Doctor Profiles', endpoint: '/api/doctor-profiles' },
          { label: 'Hotels', endpoint: '/api/hotels' },
          { label: 'Flights', endpoint: '/api/flights' },
          { label: 'Treatments', endpoint: '/api/treatment-categories' },
          { label: 'Blog Posts', endpoint: '/api/blog-posts' },
          { label: 'Testimonials', endpoint: '/api/testimonials' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.endpoint}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '16px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: '10px',
              textDecoration: 'none',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '4px' }}>REST API</div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.label}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '4px' }}>
              {item.endpoint}
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p style={{ marginTop: '3rem', fontSize: '0.8rem', opacity: 0.4 }}>
        HealthVia CMS — Powered by Payload &amp; Next.js
      </p>
    </div>
  )
}
