import { BlogTypedef } from '@/lib/typedef/blog-typedef'

export interface BlogStateTypedef {
  // State variables
  stateForBarangayExecutiveOfficials: BlogTypedef[]
  stateForBarangaykagawads: BlogTypedef[]
  stateForBarangayLupongTagapamayapa: BlogTypedef[]
  stateForSKExecutiveOfficials: BlogTypedef[]
  stateForSKkagawads: BlogTypedef[]
  stateForBarangayTanod: BlogTypedef[]
  stateForStartingYear: string
  stateForEndingYear: string
  stateForTermsAndConditionsAccepted: boolean

  // Setter functions
  setBarangayExecutiveOfficials: React.Dispatch<
    React.SetStateAction<BlogTypedef[]>
  >
  setBarangaykagawads: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setBarangayLupongTagapamayapa: React.Dispatch<
    React.SetStateAction<BlogTypedef[]>
  >
  setSKExecutiveOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setSKkagawads: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setBarangayTanod: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setStartingYear: React.Dispatch<React.SetStateAction<string>>
  setEndingYear: React.Dispatch<React.SetStateAction<string>>
  setTermsAndConditionsAccepted: React.Dispatch<React.SetStateAction<boolean>>
  setCloseDialog: () => void
}
