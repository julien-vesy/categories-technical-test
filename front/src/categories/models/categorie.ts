import { GroupCategory } from './group-category'

export interface Category {
  id: number
  group?: GroupCategory
  wording: string
  description: string
}
