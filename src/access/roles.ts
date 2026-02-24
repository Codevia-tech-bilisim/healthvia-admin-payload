import type { Access, FieldAccess } from 'payload'

// === ROLE CHECKS ===

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin' || user?.role === 'admin'
}

export const isSuperAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin'
}

export const isAdminOrSalesAgent: Access = ({ req: { user } }) => {
  return (
    user?.role === 'super-admin' ||
    user?.role === 'admin' ||
    user?.role === 'sales-agent'
  )
}

export const isAuthenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const anyone: Access = () => true

// === FIELD LEVEL ===

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  return user?.role === 'super-admin' || user?.role === 'admin'
}

// === PUBLISHED ONLY (for public-facing content) ===

export const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    _status: {
      equals: 'published',
    },
  }
}
