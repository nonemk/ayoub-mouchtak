import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HorizontalScrollComponent } from '../../../shared/components/horizontal-scroll/horizontal-scroll.component';
import { IconDirective } from '../../../shared/directives/icon.directive';

interface ITechnology {
  name: string;
  logo: keyof IconDirective['icon'];
  url: string;
}

@Component({
  selector: 'am-landing-page-technologies',
  standalone: true,
  imports: [
    CommonModule,
    HorizontalScrollComponent,
    MatButtonModule,
    IconDirective,
  ],
  templateUrl: './landing-page-technologies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageTechnologiesComponent {
  public technologies: ITechnology[] = [
    {
      name: 'Angular',
      logo: 'angular',
      url: 'https://angular.dev/',
    },
    {
      name: 'Spring Boot',
      logo: 'springBoot',
      url: 'https://https://spring.io//',
    },
    {
      name: 'Sass',
      logo: 'sass',
      url: 'https://sass-lang.com/',
    },
    {
      name: 'Typescript',
      logo: 'typescript',
      url: 'https://typescriptlang.org/',
    },
    {
      name: 'TailwindCSS',
      logo: 'tailwindcss',
      url: 'https://tailwindcss.com/',
    },
  ];
}
