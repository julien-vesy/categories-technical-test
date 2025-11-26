import { Component, input, output } from '@angular/core'
import { CategoriesSort } from '../../models/categorie-sort'

@Component({
  selector: 'app-categorie-header',
  imports: [],
  templateUrl: './categorie-header.html',
  styleUrl: './categorie-header.scss',
})
export class CategorieHeader {
  readonly categoriesSort = input<CategoriesSort>('BY_GROUP')
  readonly categoriesSortUpdated = output<CategoriesSort>()

  setCategoriesSort(categoriesSort: CategoriesSort) {
    this.categoriesSortUpdated.emit(categoriesSort)
  }
}
