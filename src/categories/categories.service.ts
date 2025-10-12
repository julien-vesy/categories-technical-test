import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { BASE_URL } from '../app/app.config'
import { Category } from './models/categorie'
import { CategoriesRepository } from './categories.repository'

@Injectable()
export class CategoriesService {
  private readonly categoriesRepository = inject(CategoriesRepository)
  private readonly http = inject(HttpClient)
  private readonly baseUrl = inject(BASE_URL)

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/api/all-categories`).pipe(
      tap((categories) => {
        this.categoriesRepository.setCategories(categories)
      })
    )
  }

  getVisibleCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}/api/visible-categories`)
      .pipe(
        tap((categories) => {
          this.categoriesRepository.setVisibleCategories(categories)
        })
      )
  }
}
