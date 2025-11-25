import { Component, inject, signal } from '@angular/core'
import { CategoriesRepository } from '../../categories.repository'
import { CategorySelectorComponent } from '../../components/category-selector/category-selector'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoriesItem } from '../../components/categorie-item/categories-item.component'
import { CategorySearchComponent } from '../../components/category-search/category-search'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { CategorieHeader } from '../../components/categorie-header/categorie-header'
import { CategoriesSort } from '../../models/categorie-sort'
import { GroupCategory } from '../../models/group-category'

@Component({
  selector: 'app-categories-page',
  imports: [
    CategorySelectorComponent,
    ReactiveFormsModule,
    CategoriesItem,
    CategorySearchComponent,
    CategorieHeader,
  ],
  providers: [CategoriesRepository],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss',
})
export class CategoriesPage {
  private readonly categoriesRepository = inject(CategoriesRepository)

  readonly groupCategories = this.categoriesRepository.groupCategories
  readonly filteredMappedVisibleCategories =
    this.categoriesRepository.filteredMappedVisibleCategories

  readonly mappedVisibleCategoriesByGroupId =
    this.categoriesRepository.mappedVisibleCategoriesByGroupId

  readonly categoriesSort = signal<CategoriesSort>('BY_GROUP')
  readonly selectedItemId = signal<number | undefined>(undefined)
  readonly hasServerError = this.categoriesRepository.hasServerError

  readonly form = new FormGroup({
    searchTerm: new FormControl<string | null>(''),
    selectedGroup: new FormControl<number | null>(null),
  })

  constructor() {
    this.form
      .get('searchTerm')!
      .valueChanges.pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.categoriesRepository.setSearchTerm(value)
      })
    this.form
      .get('selectedGroup')!
      .valueChanges.pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.categoriesRepository.setSelectedGroup(value)
      })
  }

  getColor(groupCategory: GroupCategory) {
    return 'var(--' + (groupCategory?.color ?? 'm-grey') + '-dark)'
  }

  getBackgroundColor(groupCategory: GroupCategory) {
    return 'var(--' + (groupCategory?.color ?? 'm-grey') + ')'
  }

  loadData() {
    this.categoriesRepository.reload()
  }

  setCategoriesSort(newSort: CategoriesSort) {
    this.categoriesSort.set(newSort)
  }
}
