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

  public name = input.required<string>();
  public alt = input.required<string>();
  public width = input<number>(640);
  public height = input<number>(360);
  public loading = input<'lazy' | 'eager'>('lazy');
  public caption = input<string | null>(null);

  public srcSet = computed(() => `${this.base()}/${this.name()}_640.webp`);
  public src = computed(() => `${this.base()}/${this.name()}_640.jpg`);
}
