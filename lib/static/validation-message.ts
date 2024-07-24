import { RegistrationTypedef } from '../typedef/registration-typedef'

export const validationMessage = (field: keyof RegistrationTypedef): string => {
  const messages: { [K in keyof RegistrationTypedef]?: string } = {
    surname:
      'Please enter your surname (family name). This is a required field.',
    name: 'Please enter your given name. This is a required field.',
    middleName: 'Please enter your middle name if applicable.',
    day: 'Please select your complete date of birth. All parts (day, month, and year) are required.',
    month:
      'Please select your complete date of birth. All parts (day, month, and year) are required.',
    year: 'Please select your complete date of birth. All parts (day, month, and year) are required.',
    gender:
      'Please select your gender from the provided options. This information is required.',
    status:
      'Please indicate your marital status. This information is necessary for our records.',
    street:
      'Please select your street from the dropdown list. This is part of your required address information.',
    houseNumber:
      'Please enter your house or apartment number. This completes your address information.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter a valid phone number.',
    occupation:
      'Please select your current occupation from the list. This information is required for our records.',
    nationality:
      'Please select your nationality. This is a required piece of information for our database.',
    religion:
      'Please select your religion or belief system. While personal, this information is required for our records.',
    benefits:
      'Please select any applicable benefits. If none apply, please choose "None" from the list. This field is required.',
  }

  return (
    messages[field] ||
    `The field "${field}" is required. Please provide this information to proceed.`
  )
}
