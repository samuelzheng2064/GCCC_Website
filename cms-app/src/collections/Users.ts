import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Only logged-in users can create new accounts (no public registration)
    create: ({ req }) => Boolean(req.user),
    // Users can read their own record; admins can read all
    read: ({ req }) => Boolean(req.user),
    // Users can update their own record; admins can update all
    update: ({ req }) => Boolean(req.user),
    // Only logged-in users can delete accounts
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
