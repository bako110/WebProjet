import { Component } from '@angular/core';
import { VisibilityService } from 'src/app/services/visibility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private visibilityService: VisibilityService) { }

  toggleBannerVisibility() {
    this.visibilityService.toggleVisibility();  // Appeler la méthode pour changer la visibilité
  }
}
