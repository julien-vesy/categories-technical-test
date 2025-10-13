import { Component, inject, OnInit, signal } from '@angular/core'
import { CategoriesService } from '../categories.service'
import { CategoriesRepository } from '../categories.repository'
import { CategorySelectorComponent } from '../components/category-selector/category-selector'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoriesItem } from '../components/categorie-item/categories-item.component'
import { CategorySearchComponent } from '../components/category-search/category-search'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { CategorieHeader } from '../components/categorie-header/categorie-header'
import { CategoriesSort } from '../models/categorie-sort'
import { GroupCategory } from '../models/group-category'

@Component({
  selector: 'app-categories-page',
  imports: [
    CategorySelectorComponent,
    ReactiveFormsModule,
    CategoriesItem,
    CategorySearchComponent,
    CategorieHeader,
  ],
  providers: [CategoriesRepository, CategoriesService],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss',
})
export class CategoriesPage implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  private readonly categoriesRepository = inject(CategoriesRepository)

  readonly groupCategories = this.categoriesRepository.groupCategories
  readonly mappedVisibleCategories =
    this.categoriesRepository.mappedVisibleCategories

  readonly mappedVisibleCategoriesByGroupId =
    this.categoriesRepository.mappedVisibleCategoriesByGroupId

  categoriesSort = signal<CategoriesSort>('BY_GROUP')
  selectedItemId = signal<number | undefined>(undefined)

  form = new FormGroup({
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

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe()
    this.categoriesService.getVisibleCategories().subscribe()
  }

  setCategoriesSort(newSort: CategoriesSort) {
    this.categoriesSort.set(newSort)
  }
}
