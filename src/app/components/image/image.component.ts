import { Component, input, computed, ChangeDetectionStrategy } from "@angular/core";
import config from '@/config.json';

interface AppConfig {
  cdnBaseUrl?: string;
}

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrl: "./image.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Image {
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
    return name ? `${this.base()}/${name}_1280.webp 1280w, ${this.base()}/${name}_2880.webp 2880w` : '';
  });
  public src = computed(() => {
    const name = this.name();
    return name ? `${this.base()}/${name}_1280.jpg` : '';
  });
}
