import { Component, ChangeDetectionStrategy, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '@/app/services/blog.service';

@Component({
  selector: 'app-blog-list-page',
  imports: [AsyncPipe, RouterLink],
  templateUrl: "./blog-list-page.component.html",
  styleUrl: "./blog-list-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogListPage {
  private blogService = inject(BlogService);

  protected posts$ = this.blogService.getPosts();
}
