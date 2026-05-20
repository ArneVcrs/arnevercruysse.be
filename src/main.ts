import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { createCustomElement } from '@angular/elements';
import { Thumbnail } from './app/components/thumbnail/thumbnail.component';
import { Image } from './app/components/image/image.component';

bootstrapApplication(App, appConfig)
  .then((appRef) => {
    const injector = appRef.injector;

    const thumbnailEl = createCustomElement(Thumbnail, { injector });
    customElements.define('app-thumbnail', thumbnailEl);

    const imageEl = createCustomElement(Image, { injector });
    customElements.define('app-image', imageEl);
  })
  .catch((err) => console.error(err));
