import {
  ApplicationConfig,
  inject,
  InjectionToken,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { firstValueFrom, tap } from 'rxjs'

let apiBasePath = ''
export const BASE_URL = new InjectionToken<string>('BASE_URL')

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    { provide: BASE_URL, useValue: apiBasePath },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const http = inject(HttpClient)
      return firstValueFrom(
        http.get('/config.json').pipe(
          tap((config: any) => {
            apiBasePath = config.apiBasePath
          })
        )
      )
    }),
  ],
}
