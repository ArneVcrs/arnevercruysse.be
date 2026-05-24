import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-turntable',
  templateUrl: "./turntable.component.html",
  styleUrl: "./turntable.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TurntableComponent {
  private router = inject(Router);

  private activePage$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => {
      const url = (event as NavigationEnd).urlAfterRedirects;
      const path = url.split('?')[0].split('#')[0];
      if (path === '/') {
        return 'Home';
      }
      if (path === '/about') {
        return 'About';
      }
      if (path === '/blog' || path.startsWith('/blog/')) {
        return 'Blog';
      }
      return 'Unknown';
    }),
    startWith('Home')
  );

  public activePage = toSignal(this.activePage$, { initialValue: 'Home' });
  public isSpinning = signal(true);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.isSpinning.set(true);
    });
  }

  public toggleSpinning(): void {
    this.isSpinning.update(val => !val);
  }
}
