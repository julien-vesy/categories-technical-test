import {
  computed,
  Injectable,
  linkedSignal,
  Signal,
  signal,
} from '@angular/core'
import { Category } from './models/categorie'
import { VisibleCategory } from './models/visible-category'
import { GroupCategory } from './models/group-category'

@Injectable({ providedIn: 'root' })
export class CategoriesRepository {
  readonly writableCategories = signal<Category[]>([])
  private readonly writableVisibleCategories = signal<VisibleCategory[]>([])

  private readonly searchTerm = signal<string>('')
  private readonly selectedGroup = signal<number | null>(null)

  public readonly groupCategories: Signal<GroupCategory[]> = computed(() =>
    this.writableCategories()
      .filter((cat) => cat.group !== undefined)
      .map((c) => c.group)
      .reduce<GroupCategory[]>((acc, group) => {
        if (!acc.some((g) => g.id === group!.id)) {
          acc.push(group!)
        }
        return acc
      }, [])
  )

  public readonly mappedVisibleCategories: Signal<Category[]> = linkedSignal({
    source: () => ({
      writableVisibleCategories: this.writableVisibleCategories(),
      writableCategories: this.writableCategories(),
      searchTerm: this.searchTerm(),
      selectedGroup: this.selectedGroup(),
    }),
    computation: (data) => {
      return data.writableVisibleCategories
        .map((vc) => data.writableCategories.find((i) => i.id === vc.id))
        .filter((cat) => cat !== undefined)
        .filter((cat) =>
          cat!.wording.toLowerCase().includes(data.searchTerm.toLowerCase())
        )
        .filter((cat) =>
          data.selectedGroup !== null
            ? cat!.group?.id === data.selectedGroup
            : true
        )
        .sort((a, b) =>
          a.wording.localeCompare(b.wording, 'fr', { sensitivity: 'base' })
        )
    },
  })

  mappedVisibleCategoriesByGroupId: Signal<{ [key: number]: Category[] }> =
    computed(() => {
      return this.mappedVisibleCategories().reduce(
        (acc, category) => {
          const groupId = category.group?.id ?? 0
          if (!acc[groupId]) {
            acc[groupId] = []
          }
          acc[groupId].push(category)
          return acc
        },
        {} as { [key: number]: Category[] }
      )
    })

  public setCategories(categories: Category[]): void {
    this.writableCategories.set(categories)
  }

  public setVisibleCategories(categories: VisibleCategory[]): void {
    this.writableVisibleCategories.set(categories)
  }

  public setSearchTerm(searchTerm: string | null): void {
    this.searchTerm.set(searchTerm!)
  }

  public setSelectedGroup(groupId: number | null): void {
    this.selectedGroup.set(groupId !== null ? +groupId : null)
  }
}
