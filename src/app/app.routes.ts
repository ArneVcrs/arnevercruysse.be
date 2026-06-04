import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page.component').then(m => m.HomePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component').then(m => m.AboutPage)
  },
  {
    path: 'blog',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/blog/post-list/blog-list-page.component').then(m => m.BlogListPage)
      },
      {
        path: '**',
        loadComponent: () => import('./pages/blog/post-detail/blog-post-page.component').then(m => m.BlogPostPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
