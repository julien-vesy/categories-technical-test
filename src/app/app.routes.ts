import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../categories/categories-page/categories-page').then(
        (m) => m.CategoriesPage
      ),
  },
]
