import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDirective } from '../../../shared/directives/icon.directive';

export interface IService {
  icon: keyof IconDirective['icon'];
  title: string;
  description: string;
}

@Component({
  selector: 'am-landing-page-services',
  standalone: true,
  imports: [IconDirective],
  templateUrl: './landing-page-services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageServicesComponent {
  public services: IService[] = [
    {
      icon: 'display_code',
      title: "Websites and Applications",
      description: "Interface Development"
    },
    {
      icon: 'server',
      title: "API and Database",
      description: "System Service Development"
    },
    {
      icon: 'robot',
      title: "Chatbots and Automations",
      description: "Integration with AI and Messengers"
    },
  ];
}
