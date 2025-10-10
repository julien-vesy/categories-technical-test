import { Component, forwardRef } from '@angular/core'
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.html',
  styleUrls: ['./category-search.scss'],
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySearchComponent),
      multi: true,
    },
  ],
})
export class CategorySearchComponent implements ControlValueAccessor {
  searchTerm = ''
  onChange = (value: string) => {}
  onTouched = () => {}

  writeValue(value: string): void {
    this.searchTerm = value
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

  onInputChange() {
    this.onChange(this.searchTerm)
    this.onTouched()
  }
}
