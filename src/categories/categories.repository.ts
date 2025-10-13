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

@Injectable()
export class CategoriesRepository {
  private readonly categories = signal<Category[]>([])
  private readonly visibleCategories = signal<VisibleCategory[]>([])
  private readonly searchTerm = signal<string>('')
  private readonly selectedGroup = signal<number | null>(null)

  public readonly groupCategories: Signal<GroupCategory[]> = computed(() =>
    this.mappedVisibleCategories()
      .filter((cat) => cat.group !== undefined)
      .map((c) => c.group)
      .reduce<GroupCategory[]>(
        (acc, group) => {
          if (!acc.some((g) => g.id === group!.id)) {
            acc.push(group!)
          }
          return acc
        },
        this.isThereWithoutGroup()
          ? [{ id: -1, name: 'Sans groupe', color: 'm-grey' }]
          : []
      )
  )

  private readonly isThereWithoutGroup: Signal<boolean> = computed(() =>
    this.mappedVisibleCategories().some((cat) => cat.group === undefined)
  )

  private readonly mappedVisibleCategories: Signal<Category[]> = linkedSignal({
    source: () => ({
      visibleCategories: this.visibleCategories(),
      categories: this.categories(),
    }),
    computation: (data) =>
      data.visibleCategories
        .map((vc) => data.categories.find((i) => i.id === vc.id))
        .filter((cat) => cat !== undefined),
  })

  public readonly filteredMappedVisibleCategories: Signal<Category[]> =
    linkedSignal({
      source: () => ({
        mappedVisibleCategories: this.mappedVisibleCategories(),
        searchTerm: this.searchTerm(),
        selectedGroup: this.selectedGroup(),
      }),
      computation: (data) =>
        data.mappedVisibleCategories
          .filter((cat) =>
            this.normalize(cat!.wording).includes(
              this.normalize(data.searchTerm)
            )
          )
          .filter((cat) => {
            if (data.selectedGroup === null) {
              return true
            }
            if (cat!.group) {
              return cat!.group?.id === data.selectedGroup
            } else {
              return data.selectedGroup === -1
            }
          })
          .sort((a, b) =>
            a.wording.localeCompare(b.wording, 'fr', { sensitivity: 'base' })
          ),
    })

  private normalize(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/gi, '')
      .toLowerCase()
  }

  public readonly mappedVisibleCategoriesByGroupId: Signal<{
    [key: number]: Category[]
  }> = computed(() =>
    this.filteredMappedVisibleCategories().reduce(
      (acc, category) => {
        const groupId = category.group?.id ?? -1
        if (!acc[groupId]) {
          acc[groupId] = []
        }
        acc[groupId].push(category)
        return acc
      },
      {} as { [key: number]: Category[] }
    )
  )

  public setCategories(categories: Category[]): void {
    this.categories.set(categories)
  }

  public setVisibleCategories(categories: VisibleCategory[]): void {
    this.visibleCategories.set(categories)
  }

  public setSearchTerm(searchTerm: string | null): void {
    this.searchTerm.set(searchTerm!)
  }

  public setSelectedGroup(groupId: number | null): void {
    this.selectedGroup.set(groupId !== null ? +groupId : null)
  }
}
