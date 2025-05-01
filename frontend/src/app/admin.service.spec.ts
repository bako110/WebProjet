import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

// Interface pour la réponse de l'API
interface ApiResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api'; // Modifier selon ton environnement

  constructor(private http: HttpClient) {}

  // Méthode générique pour envoyer les données à un endpoint spécifique
  private postData(endpoint: string, formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/${endpoint}`, formData).pipe(
      catchError((error) => {
        console.error(`Erreur lors de l'envoi vers ${endpoint}`, error);
        return throwError(() => error); // Renvoie l'erreur pour gestion côté composant
      })
    );
  }

  // Ajouter une bannière
  addBanner(formData: FormData): Observable<ApiResponse> {
    return this.postData('bannieres', formData);
  }

  // Ajouter un événement
  addEvent(formData: FormData): Observable<ApiResponse> {
    return this.postData('evenements', formData);
  }

  // Ajouter une publicité
  addAd(formData: FormData): Observable<ApiResponse> {
    return this.postData('publicites', formData);
  }

  // Ajouter une vidéo
  addVideo(formData: FormData): Observable<ApiResponse> {
    return this.postData('videos', formData);
  }

  // Ajouter un produit
  addProduct(formData: FormData): Observable<ApiResponse> {
    return this.postData('produits', formData);
  }

  // Ajouter un témoignage
  addTestimonial(formData: FormData): Observable<ApiResponse> {
    return this.postData('temoignages', formData);
  }

  // Ajouter une actualité
  addNews(formData: FormData): Observable<ApiResponse> {
    return this.postData('actualites', formData);
  }
}
