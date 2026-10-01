import { bootstrapApplication } from '@angular/platform-browser';
// Side-effect import: registers <ds-button> and friends.
// Styles (tokens.css, bundle.css) are wired up in angular.json.
import '@my-ds/components';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
