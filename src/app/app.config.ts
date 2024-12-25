import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import routeConfig from './app.routes';
import { tokenInterceptor } from "./core/interceptors/token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([ tokenInterceptor ])
    ),
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideAnimationsAsync()
  ]
};
