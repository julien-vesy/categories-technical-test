import { GroupCategory } from './group-category'

export interface Category {
  id: number
  group?: {
    id: number
    name: string
    color: string
  }

  wording: string
  description: string
}
