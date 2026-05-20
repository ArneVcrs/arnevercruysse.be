import { Component, input, computed, ChangeDetectionStrategy } from "@angular/core";
import config from '../../../../config.json';

interface AppConfig {
  imagesBaseUrl?: string;
}

@Component({
  selector: "app-thumbnail",
  templateUrl: "./thumbnail.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Thumbnail {
  private base = computed(() => (config as AppConfig).imagesBaseUrl ?? '');

  public name = input.required<string>();
  public alt = input.required<string>();
  public width = input<number>(640);
  public height = input<number>();

  public srcSet = computed(() => `${this.base()}/${this.name()}_640.webp`);
  public src = computed(() => `${this.base()}/${this.name()}_640.jpg`);
}
