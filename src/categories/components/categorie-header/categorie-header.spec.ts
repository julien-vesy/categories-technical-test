import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CategorieHeader } from './categorie-header'

describe('CategorieHeader', () => {
  let component: CategorieHeader
  let fixture: ComponentFixture<CategorieHeader>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieHeader],
    }).compileComponents()

    fixture = TestBed.createComponent(CategorieHeader)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
