// Importa la interfaz Routes, que define las rutas principales de la aplicación
import { Routes } from '@angular/router';

// Definición de todas las rutas disponibles en la app
export const routes: Routes = [
  {
    // Ruta raíz: redirige automáticamente a la página "gallery"
    path: '',
    redirectTo: 'gallery',
    pathMatch: 'full', // Asegura que la redirección ocurra solo si la URL está vacía
  },

  {
    // Página de la galería principal
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.page').then(m => m.GalleryPage)
  },
  {
    // Página de marcadores Y puntuaciones
    path: 'scores',
    loadComponent: () => import('./pages/scores/scores.page').then(m => m.ScoresPage)
  },
  {
    // Página de calificaciones y valoraciones
    path: 'ratings',
    loadComponent: () => import('./pages/ratings/ratings.page').then(m => m.RatingsPage)
  },
  {
    // Página de soporte y contacto
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPage)
  },
];
