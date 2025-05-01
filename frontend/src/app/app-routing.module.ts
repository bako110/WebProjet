import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/utlisateur/accueil/accueil.component';
import { AdminContenerComponent } from './components/admin/admin-contener/admin-contener.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EvenementsComponent } from './evenements/evenements.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { UserConditionComponent } from './user-condition/user-condition.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { NewsComponent } from './news/news.component';
import { MediaComponent } from './media/media.component';
import { AdhesionComponent } from './adhesion/adhesion.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { MapComponent } from './map/map.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: 'utilisateur', component: AccueilComponent },
  { path: 'admin', component: AdminContenerComponent },
  { path: 'evenements', component: EvenementsComponent },
  { path: 'testimonials', component: TestimonialsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'user-condition', component: UserConditionComponent},
  { path:'partenaires', component: PartenairesComponent},
  { path: 'news', component: NewsComponent},
  { path: 'media', component: MediaComponent},
  { path: 'adhesion', component: AdhesionComponent},
  { path: 'workshops', component: WorkshopsComponent},
  { path: 'competitions', component: CompetitionsComponent},
  { path:'map', component:MapComponent},
  { path:'about-us', component: AboutUsComponent},
  { path: 'utilisateur/%5B/UserCondition%5D', component: UserConditionComponent},
  { path: '', redirectTo: '/utilisateur', pathMatch: 'full' }, // Page d'accueil par défaut
  { path: '**', component: NotFoundComponent } // Page non trouvée pour toutes les routes incorrectes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })], // Utilisation de useHash = false pour des URLs propres
  exports: [RouterModule]
})
export class AppRoutingModule { }
