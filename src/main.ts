import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // Importa animaciones
import { provideRouter, withDebugTracing  } from '@angular/router';
import { appRoutes } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withDebugTracing()),
    provideHttpClient(), // Habilita HttpClient
    provideAnimations(), // Habilita animaciones
  ],
}).catch((err) => console.error(err));
