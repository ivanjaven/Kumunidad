export const BLOG_CONFIG = {
  OFFICIALS: {
    EXECUTIVE: [
      { role: 'Punong Barangay', name: '', image: null },
      { role: 'Barangay Secretary', name: '', image: null },
      { role: 'Barangay Treasurer', name: '', image: null },
    ],
    SK_EXECUTIVE: [
      { role: 'SK Chairperson', name: '', image: null },
      { role: 'SK Secretary', name: '', image: null },
      { role: 'SK Treasurer', name: '', image: null },
    ],
  },
  ADDITIONAL_ROLES: [
    { role: 'Barangay Kagawad', label: 'Barangay Kagawad' },
    { role: 'Lupong Tagapamayapa', label: 'Lupong Tagapamayapa' },
    { role: 'SK Kagawad', label: 'SK Kagawad' },
    { role: 'Barangay Tanod', label: 'Barangay Tanod' },
  ],
  TERMS_AND_CONDITIONS: {
    TEXT: 'I accept the',
    LINK_TEXT: 'Terms and Conditions',
    CONTENT:
      'Your terms and conditions content goes here. This is where you provide additional information that users can view when they hover over the link.',
  },
  SECTIONS: [
    {
      title: 'Executive Officials',
      key: 'EXECUTIVE',
      infoText:
        'Please enter the names and upload images for the Barangay Executive Officials. These officials are responsible for the day-to-day operations of the barangay.',
    },
    {
      title: 'Barangay Kagawad',
      key: 'BARANGAY_KAGAWAD',
      infoText:
        'Enter the details for the Barangay Kagawad. These elected officials serve as legislators at the barangay level.',
    },
    {
      title: 'Lupong Tagapamayapa',
      key: 'LUPONG_TAGAPAMAYAPA',
      infoText:
        'Provide information for the members of the Lupong Tagapamayapa. This group is responsible for settling disputes at the barangay level.',
    },
    {
      title: 'SK Executive Officials',
      key: 'SK_EXECUTIVE',
      infoText:
        'Enter the details for the Sangguniang Kabataan (SK) Executive Officials. These youth leaders are responsible for programs and projects for the youth in the barangay.',
    },
    {
      title: 'SK Kagawad',
      key: 'SK_KAGAWAD',
      infoText:
        'Provide information for the SK Kagawad. These young elected officials assist in implementing youth-focused programs in the barangay.',
    },
    {
      title: 'Barangay Tanod',
      key: 'BARANGAY_TANOD',
      infoText:
        'Enter the details for the Barangay Tanod. These individuals are responsible for maintaining peace and order in the barangay.',
    },
  ],
  TERM_INFO_TEXT:
    'Please enter the years during which the officials started and ended their term in office. The "Starting Year" refers to when their term began, and the "Ending Year" refers to when it concluded.',
}
