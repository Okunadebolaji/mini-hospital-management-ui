import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';


bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(),provideAnimations(),
    provideToastr()]
});
