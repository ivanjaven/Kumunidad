interface Filler {
  id: number
  type?: string
  name?: string
}

export interface MetadataTypedef {
  benefits: Filler[]
  occupation: Filler[]
  street: Filler[]
  nationality: Filler[]
  religion: Filler[]
}
