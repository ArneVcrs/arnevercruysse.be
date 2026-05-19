import { Component, Input } from "@angular/core";
import config from '../../../../config.json';

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html"
})
export class Image {

  @Input() public name!: string;
  @Input() public alt!: string;
  @Input() public width?: number;
  @Input() public height?: number;

  private get base(): string {
    return (config as any).imagesBaseUrl ?? '';
  }

  public get srcSet(): string {
    return `${this.base}/${this.name}_1280.webp 1280w, ${this.base}/${this.name}_2880.webp 2880w`;
  }

  public get src(): string {
    return `${this.base}/${this.name}_1280.jpg`;
  }

}
