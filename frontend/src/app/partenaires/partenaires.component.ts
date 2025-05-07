import { Component } from '@angular/core';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.css']
})
export class PartenairesComponent {

  partners = [
    {
      name: 'Partenaire 1',
      logo: 'assets/logo-partner1.png',
      description: 'Description du partenariat avec le Partenaire 1.',
      website: 'https://www.partner1.com'
    },
    {
      name: 'Partenaire 2',
      logo: 'assets/logo-partner2.png',
      description: 'Description du partenariat avec le Partenaire 2.',
      website: 'https://www.partner2.com'
    }
    // Ajoute d'autres partenaires ici...
  ];

  testimonials = [
    {
      message: '“Nous avons été ravis de collaborer avec cette association, un partenaire fiable et engagé.”',
      name: 'Nom du Partenaire 1'
    },
    {
      message: '“Une expérience enrichissante qui a renforcé notre impact local.”',
      name: 'Nom du Partenaire 2'
    }
    // Ajoute plus de témoignages ici...
  ];

  constructor() { }

  ngOnInit(): void { }

  goToContact(): void {
    // Cette méthode redirige vers une page de contact, par exemple :
    window.location.href = '/contact';
  }

  onSubmit(): void {
    // Logique de soumission du formulaire
    alert('Formulaire soumis !');
  }

}
