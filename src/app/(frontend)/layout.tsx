import React from 'react'

export const metadata = {
  title: 'HealthVia — Content Management System',
  description: 'HealthVia Healthcare Tourism Platform CMS',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <main>{children}</main>
      </body>
    </html>
  )
}
