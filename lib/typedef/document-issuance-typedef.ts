export type DocumentTitle =
  | 'Barangay Business Clearance'
  | 'Barangay Clearance'
  | 'Certificate of Indigency'
  | 'Certificate of Residency'

export interface DocumentIssuanceTypedef {
  document_title: DocumentTitle
  resident_id: number
  required_fields: Record<string, any>
  issued_by: string
  price: number
}
