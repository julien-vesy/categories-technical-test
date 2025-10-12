import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CategoriesItem } from './categories-item.component'
import { Category } from '../../models/categorie'
import { By } from '@angular/platform-browser'

describe('CategoriesItem', () => {
  let fixture: ComponentFixture<CategoriesItem>
  let component: CategoriesItem

  const mockCategory: Category = {
    id: 1,
    wording: 'Alimentation',
    description: 'Tout ce qui concerne la nourriture',
    group: {
      id: 1,
      name: 'Essentiels',
      color: 'green',
    },
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesItem],
    }).compileComponents()

    fixture = TestBed.createComponent(CategoriesItem)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display category wording and description', async () => {
    fixture.componentRef.setInput('categorie', mockCategory)
    await fixture.whenStable()
    fixture.detectChanges()

    const title = fixture.debugElement.query(By.css('.title')).nativeElement
    const body = fixture.debugElement.query(By.css('.body')).nativeElement

    expect(title.textContent).toContain(mockCategory.wording)
    expect(body.innerHTML).toContain(mockCategory.description)
  })

  it('should display group name when displayGroup is true', async () => {
    fixture.componentRef.setInput('categorie', mockCategory)
    fixture.componentRef.setInput('displayGroup', true)
    await fixture.whenStable()
    fixture.detectChanges()

    const groupEl = fixture.debugElement.query(By.css('.group'))
    expect(groupEl).toBeTruthy()
    expect(groupEl.nativeElement.textContent).toContain(
      mockCategory.group?.name
    )
  })

  it('should not display group name when displayGroup is false', async () => {
    fixture.componentRef.setInput('categorie', mockCategory)
    fixture.componentRef.setInput('displayGroup', false)
    await fixture.whenStable()
    fixture.detectChanges()

    const groupEl = fixture.debugElement.query(By.css('.group'))
    expect(groupEl).toBeNull()
  })

  it('should add "selected" class when isSelected is true', async () => {
    fixture.componentRef.setInput('categorie', mockCategory)
    fixture.componentRef.setInput('isSelected', true)
    await fixture.whenStable()
    fixture.detectChanges()

    const container = fixture.debugElement.query(
      By.css('.categories-item-container')
    ).nativeElement
    expect(container.classList).toContain('selected')
  })

  it('should emit "selected" when clicked', async () => {
    jest.spyOn(component.selected, 'emit')

    fixture.componentRef.setInput('categorie', mockCategory)
    await fixture.whenStable()
    fixture.detectChanges()

    const container = fixture.debugElement.query(
      By.css('.categories-item-container')
    )
    container.triggerEventHandler('click', null)

    expect(component.selected.emit).toHaveBeenCalled()
  })

  describe('color methods', () => {
    it('getColor should return dark variant based on category group color', async () => {
      fixture.componentRef.setInput('categorie', mockCategory)
      await fixture.whenStable()

      expect(component.getColor()).toBe('var(--green-dark)')
    })

    it('getBackgroundColor should return normal variant based on category group color', async () => {
      fixture.componentRef.setInput('categorie', mockCategory)
      await fixture.whenStable()

      expect(component.getBackgroundColor()).toBe('var(--green)')
    })

    it('getColor should default to grey when group is missing', async () => {
      const catWithoutGroup = { ...mockCategory, group: undefined }
      fixture.componentRef.setInput('categorie', catWithoutGroup)
      await fixture.whenStable()

      expect(component.getColor()).toBe('var(--m-grey-dark)')
      expect(component.getBackgroundColor()).toBe('var(--m-grey)')
    })
  })
})
