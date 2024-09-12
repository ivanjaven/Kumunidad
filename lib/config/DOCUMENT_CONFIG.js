export const DOCUMENT_CONFIG = {
  documentType: [
    {
      name: 'Barangay Business Clearance',
      icon: '/assets/images/document.png',
    },
    {
      name: 'Certificate Of Residency',
      icon: '/assets/images/document.png',
    },
    {
      name: 'Certificate Of Indigency',
      icon: '/assets/images/document.png',
    },
  ],

  document: {
    certificate_of_residency: {
      name: 'Certificate of Residency',
      fields: [
        {
          name: 'Full Name',
          type: 'text',
          label: 'Full Name',
          editable: false,
        },
        { name: 'Purok', type: 'text', label: 'Purok', editable: false },
        { name: 'Price', type: 'number', label: 'Price', editable: true },
      ],
      path: 'certificate-of-residency.docx',
    },
    barangay_business_clearance: {
      name: 'Barangay Business Clearance',
      fields: [
        {
          name: 'Full Name',
          type: 'text',
          label: 'Full Name',
          editable: false,
        },
        {
          name: 'Business Name',
          type: 'text',
          label: 'Business Name',
          editable: true,
        },
        { name: 'Price', type: 'number', label: 'Price', editable: true },
      ],
      path: 'barangay-business-clearance.docx',
    },
    certificate_of_indigency: {
      name: 'Certificate of Indigency',
      fields: [
        {
          name: 'Full Name',
          type: 'text',
          label: 'Full Name',
          editable: false,
        },
        {
          name: 'Address',
          type: 'text',
          label: 'Address',
          editable: false,
        },
        {
          name: 'Purpose',
          type: 'radio',
          label: 'Purpose',
          editable: true,
          options: [
            'Burial Assistance',
            'Educational Assistance',
            'Medical Assistance',
            'Financial Assistance',
            'Others',
          ],
        },
        { name: 'Reason', type: 'text', label: 'State Reason', editable: true },
        { name: 'Price', type: 'number', label: 'Price', editable: true },
      ],
      path: 'certificate-of-indigency.docx',
    },
  },
}
