export class Cliente {
  id: number
  firstName: string
  lastName: string
  createAt: string
  email: string
  avatar?: string
  region: Region
}

export class Region {
  id: number
  name: string
}
