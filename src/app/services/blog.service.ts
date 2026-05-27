import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { allBlogPosts, type BlogPost } from 'content-collections';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public getPosts(): Observable<BlogPost[]> {
    const sorted = [...allBlogPosts].sort((a, b) => b.date.localeCompare(a.date));
    return of(sorted);
  }

  public getPost(slug: string): Observable<BlogPost | undefined> {
    return of(allBlogPosts.find(post => post.slug === slug));
  }
}
