import { BlogTypedef } from '@/lib/typedef/blog-typedef'

export interface BlogFormTypedef {
  officials: BlogTypedef[]
  kagawads: BlogTypedef[]
  lupons: BlogTypedef[]
  tanods: BlogTypedef[]
  skOfficials: BlogTypedef[]
  skKagawads: BlogTypedef[]
  startYear: string
  endYear: string
  termsAccepted: boolean
  setOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setKagawads: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setLupons: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setTanods: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setSkOfficials: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setSkKagawads: React.Dispatch<React.SetStateAction<BlogTypedef[]>>
  setStartYear: React.Dispatch<React.SetStateAction<string>>
  setEndYear: React.Dispatch<React.SetStateAction<string>>
  setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>
  closeDialog: () => void
}
