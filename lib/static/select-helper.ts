export const SelectHelper = {
  day: Array.from({ length: 31 }, (_, i) => ({
    id: (i + 1).toString().padStart(2, '0'),
    type: (i + 1).toString(),
  })),
  month: [
    { id: '01', type: 'Jan' },
    { id: '02', type: 'Feb' },
    { id: '03', type: 'Mar' },
    { id: '04', type: 'Apr' },
    { id: '05', type: 'May' },
    { id: '06', type: 'Jun' },
    { id: '07', type: 'Jul' },
    { id: '08', type: 'Aug' },
    { id: '09', type: 'Sep' },
    { id: '10', type: 'Oct' },
    { id: '11', type: 'Nov' },
    { id: '12', type: 'Dec' },
  ],
  gender: [
    { id: 'Male', type: 'Male' },
    { id: 'Female', type: 'Female' },
    { id: 'Other', type: 'Other' },
  ],
  status: [
    { id: 'Single', type: 'Single' },
    { id: 'Married', type: 'Married' },
    { id: 'Divorced', type: 'Divorced' },
    { id: 'Widowed', type: 'Widowed' },
  ],
}
