import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adhesion',
  templateUrl: './adhesion.component.html',
  styleUrls: ['./adhesion.component.css']
})
export class AdhesionComponent implements OnInit {
  colors: string[] = [
    '#FF6F61',  // Rouge corail chaud et audacieux
    '#6A67CE',  // Bleu-violet vibrant (moderne et tech)
    '#00C9A7',  // Vert-bleu tropical frais et éclatant
    '#FFC312',  // Jaune-or solaire et énergique
    '#FF3CAC'   // Rose flashy avec du caractère
  ];
  
  currentColorIndex: number = 0;

  ngOnInit() {
    setInterval(() => {
      const container = document.querySelector('.adhesion-container') as HTMLElement;
      if (container) {
        container.style.backgroundColor = this.colors[this.currentColorIndex];
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
      }
    }, 500);
  }

  onSubmit() {
    alert("Merci pour votre adhésion ! Nous vous recontacterons rapidement par email.");
    window.location.href = '/utilisateur';

  }

  scrollToForm() {
    const el = document.getElementById("adhesionFormAnchor");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}
