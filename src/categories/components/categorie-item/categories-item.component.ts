import { Component, input } from '@angular/core'
import { Category } from '../../models/categorie'

@Component({
  selector: 'app-categorie-item',
  imports: [],
  templateUrl: './categories-item.component.html',
  styleUrl: './categories-item.component.scss',
})
export class CategoriesItem {
  readonly displayGroup = input<boolean>(false)
  readonly categorie = input.required<Category>()
}
