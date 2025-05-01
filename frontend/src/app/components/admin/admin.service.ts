import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface pour la réponse de l'API
interface ApiResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api'; // URL de l'API, pensez à la rendre configurable

  constructor(private http: HttpClient) {
    console.log('HttpClient:', this.http);
  }

  // Méthode générique pour envoyer des données
  private postData(endpoint: string, formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}${endpoint}`, formData).pipe(
      catchError((error) => this.handleError(error, endpoint))
    );
  }

  // Ajouter une bannière
  addBanner(formData: FormData): Observable<ApiResponse> {
    return this.postData('/banniere', formData);
  }

  // Ajouter un événement
  addEvent(formData: FormData): Observable<ApiResponse> {
    return this.postData('/evenement', formData);
  }

  // Ajouter une publicité
  addAd(formData: FormData): Observable<ApiResponse> {
    return this.postData('/publicite', formData);
  }

  // Ajouter une vidéo
  addVideo(formData: FormData): Observable<ApiResponse> {
    return this.postData('/video', formData); // Utilise la méthode générique pour les vidéos
  }

  // Ajouter un produit
  addProduct(formData: FormData): Observable<ApiResponse> {
    return this.postData('/produit', formData);
  }

  // Ajouter un témoignage
  addTestimonial(formData: FormData): Observable<ApiResponse> {
    return this.postData('/temoignage', formData);
  }

  // Ajouter une actualité
  addNews(formData: FormData): Observable<ApiResponse> {
    return this.postData('/actualite', formData);
  }

  // Gérer les erreurs
  private handleError(error: HttpErrorResponse, sectionName: string): Observable<never> {
    let errorMessage = `Une erreur est survenue lors de l'ajout de la ${sectionName}.`;

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur côté client: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur côté serveur: ${error.status} - ${error.message}`;
    }

    // Log l'erreur dans la console pour le débogage
    console.error(`terjetdfhtj-(riyj(ètyjy)) ${sectionName}:`, errorMessage);

    // Optionnel : Afficher un message d'erreur plus utilisateur-friendly
    alert(errorMessage);

    return throwError(() => new Error(errorMessage));
    // Lancer l'erreur pour qu'elle soit gérée ailleurs
  }
}
