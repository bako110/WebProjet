import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HttpClientModule } from '@angular/common/http'; // ✅ C'est déjà ajouté

import { NotFoundComponent } from './not-found/not-found.component';
import { UtilisateurModule } from './components/utlisateur/utilisateur.module';
import { AdminModule } from './components/admin/admin.module';
import { EvenementsComponent } from './evenements/evenements.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { MediaComponent } from './media/media.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { NewsComponent } from './news/news.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { ContactComponent } from './contact/contact.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { ArtistsComponent } from './artists/artists.component';
import { MapComponent } from './map/map.component';
import { BlogComponent } from './blog/blog.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UserConditionComponent } from './user-condition/user-condition.component';
import { AdhesionComponent } from './adhesion/adhesion.component';  // AdminModule importé
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    EvenementsComponent,
    PartenairesComponent,
    MediaComponent,
    TestimonialsComponent,
    NewsComponent,
    WorkshopsComponent,
    ContactComponent,
    CompetitionsComponent,
    ArtistsComponent,
    MapComponent,
    BlogComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    UserConditionComponent,
    AdhesionComponent, // Déclaré ici
    // Pas besoin de déclarer AdminContenerComponent ici car il est déjà dans AdminModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UtilisateurModule,  // Module utilisateur importé
    AdminModule         // Module admin importé, contenant AdminContenerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
