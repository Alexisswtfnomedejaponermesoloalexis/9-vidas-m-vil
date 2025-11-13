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


// Si la app está en modo producción, se activan optimizaciones de Angular
// Esto elimina mensajes de depuración y mejora el rendimiento
if (environment.production) {
  enableProdMode();
}


// Inicia (bootstrap) la aplicación con el componente raíz "AppComponent"
bootstrapApplication(AppComponent, {
  providers: [
    // Define cómo se manejarán las rutas en Ionic (para optimizar la navegación)
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Inicializa las funciones base de Ionic (componentes, navegación, etc.)
    provideIonicAngular(),

    // Proporciona las rutas definidas en app.routes.ts
    provideRouter(routes),

    // Inicializa Firebase con la configuración del archivo environment.ts
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // Proporciona el servicio de base de datos Firestore a toda la aplicación
    provideFirestore(() => getFirestore()),
  ],
});
