import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { BASE_URL } from '../app/app.config'
import { Category } from './models/categorie'
import { CategoriesRepository } from './categories.repository'

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(
    private readonly http: HttpClient,
    @Inject(BASE_URL) private readonly baseUrl: string,
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/api/all-categories`).pipe(
      tap((categories) => {
        this.categoriesRepository.setCategories(categories)
      })
    )
  }

  public getVisibleCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}/api/visible-categories`)
      .pipe(
        tap((categories) => {
          this.categoriesRepository.setVisibleCategories(categories)
        })
      )
  }
}
