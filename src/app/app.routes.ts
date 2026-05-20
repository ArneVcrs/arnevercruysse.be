import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home-page.component';
import { AboutPage } from './pages/about/about-page.component';
import { BlogListPage } from './pages/blog/post-list/blog-list-page.component';
import { BlogPostPage } from './pages/blog/post-detail/blog-post-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'about',
    component: AboutPage
  },
  {
    path: 'blog',
    children: [
      {
        path: '',
        component: BlogListPage
      },
      {
        path: '**',
        component: BlogPostPage
      }
    ]
  }
];
