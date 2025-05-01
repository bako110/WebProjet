import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private isVisibleSource = new BehaviorSubject<boolean>(false); // Par défaut, le banner est caché
  isVisible$ = this.isVisibleSource.asObservable();

  toggleVisibility() {
    this.isVisibleSource.next(!this.isVisibleSource.value); // Bascule l'état de visibilité
  }
}
