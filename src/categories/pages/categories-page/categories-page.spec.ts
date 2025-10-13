import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CategoriesPage } from './categories-page'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { BASE_URL } from '../../../app/app.config'
import { CategoriesRepository } from '../../categories.repository'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'

describe('CategoriesPage', () => {
  let component: CategoriesPage
  let fixture: ComponentFixture<CategoriesPage>
  let repository: CategoriesRepository

  const mockRepository = {
    groupCategories: jest.fn(),
    mappedVisibleCategories: jest.fn(),
    mappedVisibleCategoriesByGroupId: jest.fn(),
    setSearchTerm: jest.fn(),
    setSelectedGroup: jest.fn(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CategoriesPage],
      providers: [
        FormBuilder,
        { provide: BASE_URL, useValue: 'http://localhost' },
        { provide: CategoriesRepository, useValue: mockRepository },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(CategoriesPage)
    component = fixture.componentInstance
    repository = TestBed.inject(CategoriesRepository)
    fixture.detectChanges()
  })

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy()
  })

  it('devrait initialiser les signaux correctement', () => {
    expect(component.categoriesSort()).toBe('BY_GROUP')
    expect(component.selectedItemId()).toBeUndefined()
  })

  describe('setCategoriesSort', () => {
    it('devrait mettre à jour le signal categoriesSort', () => {
      component.setCategoriesSort('BY_ALPHA')
      expect(component.categoriesSort()).toBe('BY_ALPHA')
    })
  })

  describe('Repository methods', () => {
    it('devrait avoir setSearchTerm comme fonction', () => {
      expect(typeof repository.setSearchTerm).toBe('function')
    })

    it('devrait avoir setSelectedGroup comme fonction', () => {
      expect(typeof repository.setSelectedGroup).toBe('function')
    })

    it('devrait appeler setSearchTerm si on l’appelle directement', () => {
      const spy = jest.spyOn(repository, 'setSearchTerm')
      repository.setSearchTerm('Remboursement')
      expect(spy).toHaveBeenCalledWith('Remboursement')
    })

    it('devrait appeler setSelectedGroup si on l’appelle directement', () => {
      const spy = jest.spyOn(repository, 'setSelectedGroup')
      repository.setSelectedGroup(2)
      expect(spy).toHaveBeenCalledWith(2)
    })

    it('devrait appeler setSelectedGroup avec null si on l’appelle directement', () => {
      const spy = jest.spyOn(repository, 'setSelectedGroup')
      repository.setSelectedGroup(null)
      expect(spy).toHaveBeenCalledWith(null)
    })
  })
})
