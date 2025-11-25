// es el corazón del arranque de la aplicación Angular/Ionic.
//Metimos Firebase en main.ts porque es el único lugar de arranque en una app Standalone. 
// Al "proveerlo" ahí, lo convertimos en un servicio global disponible para cualquier parte de tu aplicación, listo para ser inyectado y usado.
// Importa funciones principales de Angular
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// Importa las rutas y el componente principal de la app
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Importa las configuraciones del entorno (Firebase y modo producción)
import { environment } from './environments/environment';

// Importa funciones necesarias para inicializar Firebase y Firestore
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';


if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideIonicAngular(),

    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
});
