import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { GroupCategory } from '../../models/group-category'
import { By } from '@angular/platform-browser'
import { CategorySelectorComponent } from './category-selector'

describe('CategorySelectorComponent', () => {
  let component: CategorySelectorComponent
  let fixture: ComponentFixture<CategorySelectorComponent>

  const mockGroups: GroupCategory[] = [
    { id: 1, name: 'TVA', color: 'm-red' },
    { id: 2, name: 'vehicule', color: 'm-green' },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CategorySelectorComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CategorySelectorComponent)
    component = fixture.componentInstance

    component.groupCategories = () => mockGroups
    fixture.detectChanges()
  })

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy()
  })

  it('devrait initialiser selectedGroup à null', () => {
    expect(component.selectedGroup).toBeNull()
  })

  it('writeValue doit mettre à jour selectedGroup', () => {
    component.writeValue(2)
    expect(component.selectedGroup).toBe(2)
  })

  it('registerOnChange et registerOnTouched doivent assigner les fonctions', () => {
    const changeFn = jest.fn()
    const touchFn = jest.fn()

    component.registerOnChange(changeFn)
    component.registerOnTouched(touchFn)

    expect(component.onChange).toBe(changeFn)
    expect(component.onTouched).toBe(touchFn)
  })

  it('onGroupChange doit appeler onChange et onTouched', () => {
    const changeSpy = jest.fn()
    const touchSpy = jest.fn()
    component.registerOnChange(changeSpy)
    component.registerOnTouched(touchSpy)

    component.selectedGroup = 1
    component.onGroupChange()

    expect(changeSpy).toHaveBeenCalledWith(1)
    expect(touchSpy).toHaveBeenCalled()
  })

  it('doit rendre toutes les options du select', () => {
    fixture.detectChanges()
    const selectEl = fixture.debugElement.query(By.css('select')).nativeElement
    const options = selectEl.querySelectorAll('option')

    expect(options.length).toBe(mockGroups.length + 1)
    expect(options[0].textContent).toContain('Tous les groupes de catégories')
    expect(options[1].textContent).toContain('TVA')
    expect(options[2].textContent).toContain('vehicule')
  })

  it('changer la sélection doit appeler onGroupChange', () => {
    const spy = jest.spyOn(component, 'onGroupChange')
    fixture.detectChanges()

    const selectEl: HTMLSelectElement = fixture.debugElement.query(
      By.css('select')
    ).nativeElement
    selectEl.value = selectEl.options[1].value
    selectEl.dispatchEvent(new Event('change'))
    fixture.detectChanges()

    expect(spy).toHaveBeenCalled()
  })
})
