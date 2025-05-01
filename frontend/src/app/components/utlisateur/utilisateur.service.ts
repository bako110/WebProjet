import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private readonly apiUrl = 'http://localhost:3000/api'; // Remplace si ton backend est en ligne

  constructor(private readonly http: HttpClient) {}

  // Getter pour obtenir l'URL de base pour les images
  get apiBaseUrl(): string {
    return this.apiUrl;
  }

  // Récupérer les bannières
  getBannieres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/banniere`);
  }

  // Récupérer les événements
  getEvenements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/evenement`);
  }

  // Récupérer les publicités
  getPublicites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/publicite`);
  }

  // Récupérer les vidéos
  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/video`);
  }

  // Récupérer les produits
  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/produit`);
  }

  // Récupérer les témoignages
  getTemoignages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/temoignage`);
  }

  // Récupérer les actualités
  getActualites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actualite`);
  }
}
