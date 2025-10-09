import { computed, Injectable, Signal, signal } from '@angular/core'
import { Category } from './models/categorie'
import { VisibleCategory } from './models/visible-category'
import { GroupCategory } from './models/group-category'

@Injectable({ providedIn: 'root' })
export class CategoriesRepository {
  readonly writableCategories = signal<Category[]>([])
  private readonly writableVisibleCategories = signal<VisibleCategory[]>([])

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
      .sort((a, b) =>
        a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
      )
  )

  // categori;

  public readonly mappedVisibleCategories: Signal<Category[]> = computed(() =>
    this.writableVisibleCategories()
      .map((vc) => this.writableCategories().find((i) => i.id === vc.id))
      .filter((cat) => cat !== undefined)
  )

  private writableHasBeenLoaded = signal<boolean>(false)
  public hasBeenLoaded: Signal<boolean> = this.writableHasBeenLoaded

  public setCategories(categories: Category[]): void {
    this.writableCategories.set(categories)
  }

  public setVisibleCategories(categories: VisibleCategory[]): void {
    this.writableVisibleCategories.set(categories)
  }
}
