import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-banner',
  templateUrl: './promotion-banner.component.html',
  styleUrls: ['./promotion-banner.component.css']
})
export class PromotionBannerComponent implements OnInit {
  showCookieBanner = false;
  isFading = false;

  ngOnInit(): void {
    // Vérifier si le cookie existe déjà
    if (!this.getCookie('promotionSeen')) {
      this.showCookieBanner = true;

      // Afficher la bannière pendant 40 secondes
      setTimeout(() => {
        this.startFading(); // Commence l'animation de clignotement avant de fermer
      }, 30000); // Début du clignotement après 30 secondes

      setTimeout(() => {
        this.closeCookieBanner(); // Fermer la bannière après 40 secondes
      }, 40000); // La bannière disparaît après 40 secondes
    }
  }

  startFading(): void {
    this.isFading = true; // Démarre le clignotement
  }

  closeCookieBanner(): void {
    this.showCookieBanner = false;
    this.setCookie('promotionSeen', 'true', 365); // Enregistrer un cookie pour 365 jours
  }

  // Fonction pour définir un cookie
  setCookie(name: string, value: string, days: number): void {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  // Fonction pour récupérer un cookie
  getCookie(name: string): string | null {
    const nameEq = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
    }
    return null;
  }
}
