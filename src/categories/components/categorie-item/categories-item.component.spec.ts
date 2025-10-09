import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CategoriesItem } from './categories-item.component'

describe('CategorieItem', () => {
  let component: CategoriesItem
  let fixture: ComponentFixture<CategoriesItem>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesItem],
    }).compileComponents()

    fixture = TestBed.createComponent(CategoriesItem)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
