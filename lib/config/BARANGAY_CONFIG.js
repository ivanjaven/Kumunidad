export const BarangayConfig = {
  defaultSettings: {
    logoUrl: '/assets/images/5.webp',
    name: 'Bambang',
  },
  userRoles: {
    admin: {
      quickAccessFeatures: [
        {
          title: 'Resident Registration',
          description:
            'Guidelines and procedures for registering residents in the barangay.',
          imageUrl: '/assets/images/1.webp',
          linkUrl: '/registration',
        },
        {
          title: 'Document Processing',
          description:
            'Instructions on obtaining and processing various barangay documents.',
          imageUrl: '/assets/images/2.webp',
          linkUrl: '/documents',
        },
        {
          title: 'Report Generation',
          description:
            'Overview of barangay reports and how to generate them steps to create and manage.',
          imageUrl: '/assets/images/3.webp',
          linkUrl: '/reports',
        },
        {
          title: 'Population Records',
          description:
            'Maintaining and updating the population records of the barangay.',
          imageUrl: '/assets/images/4.webp',
          linkUrl: '/population-records',
        },
        {
          title: 'Barangay Information',
          description:
            'Comprehensive details about the barangay, including history and demographics.',
          imageUrl: '/assets/images/1.webp',
          linkUrl: '/barangay-information',
        },
        {
          title: 'User Management',
          description:
            'Steps to create and manage user profiles in the barangay system.',
          imageUrl: '/assets/images/2.webp',
          linkUrl: '/user-management',
        },
      ],
    },
    secretary: {
      quickAccessFeatures: [
        {
          title: 'Resident Registration',
          description:
            'Guidelines and procedures for registering residents in the barangay.',
          imageUrl: '/assets/images/1.webp',
          linkUrl: '/registration',
        },
        {
          title: 'Document Processing',
          description:
            'Instructions on obtaining and processing various barangay documents.',
          imageUrl: '/assets/images/2.webp',
          linkUrl: '/documents',
        },
        {
          title: 'Report Generation',
          description: 'Overview of barangay reports and how to generate them.',
          imageUrl: '/assets/images/3.webp',
          linkUrl: '/reports',
        },
        {
          title: 'Population Records',
          description:
            'Maintaining and updating the population records of the barangay.',
          imageUrl: '/assets/images/4.webp',
          linkUrl: '/population-records',
        },
      ],
    },
  },
}
