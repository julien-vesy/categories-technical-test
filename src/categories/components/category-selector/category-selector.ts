import { Component, forwardRef, input } from '@angular/core'
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { GroupCategory } from '../../models/group-category'

@Component({
  selector: 'app-categories-selector-item',
  templateUrl: './category-selector.html',
  styleUrls: ['./category-selector.scss'],
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySelectorComponent),
      multi: true,
    },
  ],
})
export class CategorySelectorComponent implements ControlValueAccessor {
  readonly groupCategories = input<GroupCategory[]>([])

  selectedGroup: number | null = null
  onChange = (value: number | null) => {}
  onTouched = () => {}

  writeValue(value: number): void {
    this.selectedGroup = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optionnel
  }

  onGroupChange() {
    console.log(this.selectedGroup)
    this.onChange(this.selectedGroup)
    this.onTouched()
  }
}
