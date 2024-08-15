export type Role =
  | 'Punong Barangay'
  | 'Barangay Secretary'
  | 'Barangay Treasurer'
  | 'Barangay Kagawad'
  | 'Lupong Tagapamayapa'
  | 'Barangay Tanod'
  | 'SK Chairperson'
  | 'SK Secretary'
  | 'SK Treasurer'
  | 'SK Kagawad'

export interface BlogTypedef {
  role: Role
  name: string
  image: string | null
}
