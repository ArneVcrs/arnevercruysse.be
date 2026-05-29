import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly socialLinks = [
    {
      name: 'github',
      url: 'https://github.com/ArneVcrs',
      ariaLabel: 'GitHub profile of Arne Vercruysse',
      iconUrl: '/icons/github.svg'
    },
    {
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/arne-vercruysse',
      ariaLabel: 'LinkedIn profile of Arne Vercruysse',
      iconUrl: '/icons/linkedin.svg'
    }
  ];
}
