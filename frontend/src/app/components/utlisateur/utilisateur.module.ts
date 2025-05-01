import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Utile si tu utilises [(ngModel)]
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Directives Angular
import { NgClass } from '@angular/common';

// Composants utilisateur
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { ContenuAccueilComponent } from './contenu-accueil/contenu-accueil.component';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    BannerComponent,
    ContenuAccueilComponent,
    AccueilComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    BannerComponent,
    ContenuAccueilComponent,
    AccueilComponent,
    RouterModule
  ]
})
export class UtilisateurModule { }
