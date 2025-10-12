import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CategoriesPage } from './categories-page'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { BASE_URL } from '../../app/app.config'

describe('CategoriesPage', () => {
  let component: CategoriesPage
  let fixture: ComponentFixture<CategoriesPage>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesPage],
      providers: [
        { provide: BASE_URL, useValue: 'http://localhost' },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(CategoriesPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
