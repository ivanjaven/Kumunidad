import { SelectTypedef } from '../typedef/select-typedef'

export class SelectModel {
  id: number
  type: string

  constructor(data: SelectTypedef) {
    this.id = data.id
    this.type = data.type
  }

  getId(): number {
    return this.id
  }

  getType(): string {
    return this.type
  }
}
