import { Component, Input } from "@angular/core";
import config from '../../../../config.json';

@Component({
  selector: "app-thumbnail",
  templateUrl: "./thumbnail.component.html"
})
export class Thumbnail {

  @Input() public name!: string;
  @Input() public alt!: string;
  @Input() public width: number = 640;
  @Input() public height?: number;

  private get base(): string {
    return (config as any).imagesBaseUrl ?? '';
  }

  public get srcSet(): string {
    return `${this.base}/${this.name}_640.webp`;
  }

  public get src(): string {
    return `${this.base}/${this.name}_640.jpg`;
  }

}
