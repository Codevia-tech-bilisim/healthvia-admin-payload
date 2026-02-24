'use client'

import React, { useEffect, useState } from 'react'

const BACKEND_URL =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_HEALTHVIA_API_URL || 'https://api.healthviatech.website'
    : 'https://api.healthviatech.website'

export default function BeforeDashboard() {
  const [backendUp, setBackendUp] = useState<boolean | null>(null)

  useEffect(() => {
    fetch(`${BACKEND_URL}/actuator/health`, { signal: AbortSignal.timeout(5000) })
      .then((res) => res.ok && res.json())
      .then((data) => setBackendUp(data?.status === 'UP'))
      .catch(() => setBackendUp(false))
  }, [])

  const statusColor = backendUp === null ? '#fbbf24' : backendUp ? '#22c55e' : '#ef4444'
  const statusText = backendUp === null ? 'Checking...' : backendUp ? 'Online' : 'Offline'

  const links = [
    { label: 'Swagger API', url: `${BACKEND_URL}/swagger-ui/index.html`, emoji: '📋' },
    { label: 'Patient Site', url: 'https://healthviatech.website', emoji: '🌐' },
    { label: 'MongoDB Atlas', url: 'https://cloud.mongodb.com', emoji: '🗄️' },
    { label: 'GCP Console', url: 'https://console.cloud.google.com', emoji: '☁️' },
  ]

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a2b4b 0%, #3E4F6F 50%, #6986AA 100%)',
          borderRadius: '12px',
          padding: '1.5rem 2rem',
          color: '#fff',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 700 }}>
            Welcome to <span style={{ color: '#f97316' }}>HealthVia</span> Admin
          </h2>
          <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '0.85rem' }}>
            Manage doctors, treatments, content & patient journeys
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '50px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            fontSize: '0.8rem',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: statusColor,
              boxShadow: `0 0 6px ${statusColor}`,
            }}
          />
          Spring Boot API: {statusText}
        </div>
      </div>

      {/* Quick Links */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid var(--theme-elevation-150)',
              backgroundColor: 'var(--theme-elevation-50)',
              textDecoration: 'none',
              color: 'var(--theme-text)',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#f97316')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--theme-elevation-150)')}
          >
            <span style={{ fontSize: '1.1rem' }}>{link.emoji}</span>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
