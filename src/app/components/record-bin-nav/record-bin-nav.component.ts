import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-record-bin-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./record-bin-nav.component.html",
  styleUrl: "./record-bin-nav.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordBinComponentNav {
  routes: RecordBinRoute[] = RECORD_BIN_ROUTES;
}

export interface RecordBinRoute {
  path: string;
  title: string;
  exact?: boolean;
}

export const RECORD_BIN_ROUTES: RecordBinRoute[] = [
  { path: '/', title: 'HOME', exact: true },
  { path: '/about', title: 'ABOUT' },
  { path: '/blog', title: 'BLOG' }
];
