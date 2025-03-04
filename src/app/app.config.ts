import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './auth.interceptor';
import { errorInterceptor } from './error.interceptor';
import { AsyncSubject } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideHttpClient(withInterceptors([errorInterceptor,authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(),
    
    ]
};
