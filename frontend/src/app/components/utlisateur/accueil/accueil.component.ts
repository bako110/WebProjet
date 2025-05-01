import { Component, OnInit, OnDestroy } from '@angular/core';
import { VisibilityService } from 'src/app/services/visibility.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, OnDestroy {
  isBannerVisible = false;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly visibilityService: VisibilityService) {}

  ngOnInit(): void {
    // Abonnement à la visibilité du banner
    this.visibilityService.isVisible$
      .pipe(takeUntil(this.destroy$))
      .subscribe((visibility: boolean) => {
        this.isBannerVisible = visibility;
      });
  }

  // Méthode pour basculer la visibilité
  toggleBannerVisibility(): void {
    this.visibilityService.toggleVisibility();
  }

  ngOnDestroy(): void {
    // Nettoyage de l'abonnement lors de la destruction du composant
    this.destroy$.next();
    this.destroy$.complete();
  }
}
