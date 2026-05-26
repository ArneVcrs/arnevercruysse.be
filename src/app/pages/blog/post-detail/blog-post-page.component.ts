import { Component, ChangeDetectionStrategy, inject, signal, ViewEncapsulation, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogService } from '@/app/services/blog.service';

@Component({
  selector: 'app-blog-post-page',
  imports: [RouterLink],
  templateUrl: "./blog-post-page.component.html",
  styleUrl: "./blog-post-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogPostPage implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private sanitizer = inject(DomSanitizer);

  public post = signal<any>(null);
  public htmlContent = signal<SafeHtml | null>(null);

  public ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      const slug = segments.map(s => s.path).join('/');
      if (slug) {
        this.blogService.getPost(slug).subscribe((post) => {
          if (post) {
            this.post.set(post);
            this.htmlContent.set(this.sanitizer.bypassSecurityTrustHtml(post.html));
          }
        });
      }
    });
  }
}
