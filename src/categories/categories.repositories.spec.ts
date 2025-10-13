import { CategoriesRepository } from './categories.repository'
import { Category } from './models/categorie'
import { GroupCategory } from './models/group-category'
import { VisibleCategory } from './models/visible-category'

describe('CategoriesRepository', () => {
  let service: CategoriesRepository

  const groupS: GroupCategory = { id: -1, name: 'Sans groupe', color: 'm-grey' }
  const groupA: GroupCategory = { id: 1, name: 'Remboursement', color: 'red' }
  const groupB: GroupCategory = { id: 2, name: 'Impôt', color: 'blue' }

  const categories: Category[] = [
    {
      id: 1,
      wording: 'cotisations',
      description: 'cotisations sociales',
      group: groupA,
    },
    {
      id: 2,
      wording: 'Frais bancaires',
      description: 'Frais facturés',
      group: groupA,
    },
    {
      id: 3,
      wording: 'Sous-traitance',
      description: 'Achats de marchandises',
      group: groupB,
    },
    { id: 4, wording: 'TVA', description: 'TVA sur factures' },
  ]

  const visibleCategories: VisibleCategory[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ]

  beforeEach(() => {
    service = new CategoriesRepository()
    service.setCategories(categories)
    service.setVisibleCategories(visibleCategories)
    service.setSearchTerm('')
    service.setSelectedGroup(null)
  })

  describe('setters', () => {
    it('devrait définir les catégories correctement', () => {
      service.setCategories(categories)
      expect(service['categories']()).toEqual(categories)
    })

    it('devrait définir les catégories visibles correctement', () => {
      service.setVisibleCategories(visibleCategories)
      expect(service['visibleCategories']()).toEqual(visibleCategories)
    })

    it('devrait définir le terme de recherche correctement', () => {
      service.setSearchTerm('cotisation')
      expect(service['searchTerm']()).toBe('cotisation')
    })

    it('devrait définir le groupe sélectionné correctement', () => {
      service.setSelectedGroup(1)
      expect(service['selectedGroup']()).toBe(1)
    })

    it('devrait remettre le groupe sélectionné à null', () => {
      service.setSelectedGroup(null)
      expect(service['selectedGroup']()).toBeNull()
    })
  })

  describe('groupCategories', () => {
    it('devrait extraire les groupes uniques à partir des catégories', () => {
      const result = service.groupCategories()
      expect(result).toEqual([groupS, groupA, groupB])
    })
  })

  describe('mappedVisibleCategories', () => {
    it('devrait retourner toutes les catégories visibles triées par wording', () => {
      const result = service.filteredMappedVisibleCategories()
      const sorted = [...categories].sort((a, b) =>
        a.wording.localeCompare(b.wording, 'fr', { sensitivity: 'base' })
      )
      expect(result).toEqual(sorted)
    })

    it('devrait filtrer selon le terme de recherche (insensible aux accents et majuscules)', () => {
      service.setSearchTerm('cot')
      const result = service.filteredMappedVisibleCategories()
      expect(result.map((c) => c.wording)).toEqual(['cotisations'])
    })

    it('devrait filtrer selon le groupe sélectionné', () => {
      service.setSelectedGroup(1)
      const result = service.filteredMappedVisibleCategories()
      expect(result.every((c) => c.group?.id === 1)).toBe(true)
    })

    it('devrait combiner les filtres groupe + recherche', () => {
      service.setSelectedGroup(1)
      service.setSearchTerm('ban')
      const result = service.filteredMappedVisibleCategories()
      expect(result.map((c) => c.wording)).toEqual(['Frais bancaires'])
    })
  })

  describe('mappedVisibleCategoriesByGroupId', () => {
    it('devrait regrouper les catégories visibles par ID de groupe', () => {
      const result = service.mappedVisibleCategoriesByGroupId()
      expect(Object.keys(result)).toContain('1')
      expect(Object.keys(result)).toContain('2')
      expect(result[1].length).toBe(2)
      expect(result[2].length).toBe(1)
    })

    it('devrait inclure les catégories sans groupe sous l’ID 0', () => {
      const result = service.mappedVisibleCategoriesByGroupId()
      expect(result[-1]).toBeDefined()
      expect(result[-1][0].wording).toBe('TVA')
    })
  })

  describe('normalize', () => {
    it('devrait mettre les lettres en minuscules', () => {
      expect(service['normalize']('ABC')).toBe('abc')
    })

    it('devrait retirer les accents', () => {
      expect(service['normalize']('Éléphant')).toBe('elephant')
    })

    it('devrait retirer les caractères spéciaux', () => {
      expect(service['normalize']('à toi!')).toBe('atoi')
    })

    it('devrait conserver les chiffres', () => {
      expect(service['normalize']('Test123')).toBe('test123')
    })

    it('devrait combiner plusieurs transformations', () => {
      expect(service['normalize']('Àéîôù 123 !')).toBe('aeiou123')
    })
  })
})
