import { bootstrapApplication } from '@angular/platform-browser';
import { MainComponent } from './app/main.component';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(MainComponent, {
  providers: [provideAnimations()],
});
