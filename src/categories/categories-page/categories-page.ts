import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core'
import { CategoriesService } from '../categories.service'
import { CategoriesRepository } from '../categories.repository'
import { CategorySelectorComponent } from '../components/category-selector/category-selector'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { CategoriesItem } from '../components/categorie-item/categories-item.component'
import { CategorySearchComponent } from '../components/category-search/category-search'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-categories-page',
  imports: [
    CategorySelectorComponent,
    ReactiveFormsModule,
    CategoriesItem,
    CategorySearchComponent,
  ],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss',
})
export class CategoriesPage implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  private readonly categoriesRepository = inject(CategoriesRepository)
  private readonly fb = inject(FormBuilder)

  readonly groupCategories = this.categoriesRepository.groupCategories
  readonly mappedVisibleCategories =
    this.categoriesRepository.mappedVisibleCategories
  readonly writableCategories = this.categoriesRepository.writableCategories

  readonly mappedVisibleCategoriesByGroupId =
    this.categoriesRepository.mappedVisibleCategoriesByGroupId

  readonly writableCategories2 = computed(() => {
    return new Set(
      this.writableCategories().map((category) => category.group?.color)
    )
  })

  displayByGroup = true

  form = this.fb.group({
    searchTerm: [''],
    selectedGroup: [null],
    selectedCategory: [null],
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

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe()
    this.categoriesService.getVisibleCategories().subscribe()
  }

  click() {
    console.log(this.form.controls['selectedGroup'].value === null)
  }
}
