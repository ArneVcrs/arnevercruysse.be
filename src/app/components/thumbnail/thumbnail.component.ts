import { Component, input, computed, ChangeDetectionStrategy } from "@angular/core";
import config from '@/config.json';

interface AppConfig {
  cdnBaseUrl?: string;
}

@Component({
  selector: "app-thumbnail",
  templateUrl: "./thumbnail.component.html",
  styleUrl: "./thumbnail.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Thumbnail {
  private base = computed(() => {
    const cdn = (config as AppConfig).cdnBaseUrl ?? '';
    return cdn ? `${cdn}/images` : '';
  });

  public name = input<string>('');
  public alt = input<string>('');
  public loading = input<'lazy' | 'eager'>('lazy');
  public caption = input<string | null>(null);

  public srcSet = computed(() => {
    const name = this.name();
    return name ? `${this.base()}/${name}_640.webp` : '';
  });
  public src = computed(() => {
    const name = this.name();
    return name ? `${this.base()}/${name}_640.jpg` : '';
  });
}
