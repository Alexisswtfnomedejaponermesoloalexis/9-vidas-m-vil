import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'gallery',
    pathMatch: 'full', 
  },

  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.page').then(m => m.GalleryPage)
  },
  {
    path: 'scores',
    loadComponent: () => import('./pages/scores/scores.page').then(m => m.ScoresPage)
  },
  {
    path: 'ratings',
    loadComponent: () => import('./pages/ratings/ratings.page').then(m => m.RatingsPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then( m => m.AboutPage)
  },
];
