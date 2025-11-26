import { Component, input, output } from '@angular/core'
import { Category } from '../../models/categorie'

@Component({
  selector: 'app-categorie-item',
  imports: [],
  templateUrl: './categories-item.component.html',
  styleUrl: './categories-item.component.scss',
})
export class CategoriesItem {
  readonly displayGroup = input<boolean>(false)
  readonly isSelected = input<boolean>(false)
  readonly categorie = input.required<Category>()
  readonly selected = output<void>()

  getColor() {
    return 'var(--' + (this.categorie().group?.color ?? 'm-grey') + '-dark)'
  }

  getBackgroundColor() {
    return 'var(--' + (this.categorie().group?.color ?? 'm-grey') + ')'
  }
}
