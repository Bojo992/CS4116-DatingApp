import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {ApplicationConfig} from "@angular/core";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};
