import React from 'react'

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* HealthVia Logo Mark */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="8" fill="#1a2b4b" />
        <path
          d="M10 18C10 18 13 12 18 12C23 12 26 18 26 18C26 18 23 24 18 24C13 24 10 18 10 18Z"
          stroke="#f97316"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="18" cy="18" r="3" fill="#f97316" />
        <path d="M18 8V12M18 24V28M8 18H12M24 18H28" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Text Logo */}
      <span
        style={{
          fontSize: '22px',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          color: '#f97316',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        HEALTH
        <span style={{ color: '#1a2b4b' }}>VIA</span>
      </span>
    </div>
  )
}
