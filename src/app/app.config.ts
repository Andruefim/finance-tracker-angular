import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import routeConfig from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideAnimationsAsync()
  ]
};
