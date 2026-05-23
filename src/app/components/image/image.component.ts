import { Component, input, computed, ChangeDetectionStrategy } from "@angular/core";
import config from '../../../../config.json';

interface AppConfig {
  imagesBaseUrl?: string;
}

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrl: "./image.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Image {
  private base = computed(() => (config as AppConfig).imagesBaseUrl ?? '');

  public name = input.required<string>();
  public alt = input.required<string>();
  public width = input<number>();
  public height = input<number>();
  public loading = input<'lazy' | 'eager'>('lazy');
  public caption = input<string | null>(null);

  public srcSet = computed(() => `${this.base()}/${this.name()}_1280.webp 1280w, ${this.base()}/${this.name()}_2880.webp 2880w`);
  public src = computed(() => `${this.base()}/${this.name()}_1280.jpg`);
}
