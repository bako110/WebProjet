import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import du FormsModule
import { HttpClientModule } from '@angular/common/http'; // ✅ Import de HttpClientModule

import { AdminContenerComponent } from './admin-contener/admin-contener.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSlideComponent } from './dashboard-slide/dashboard-slide.component';

// Import du service AdminService
import { AdminService } from './admin.service';

@NgModule({
  declarations: [
    AdminContenerComponent,
    DashboardComponent,
    DashboardSlideComponent // ✅ Déclaré ici
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, // ✅ Ajouté dans les imports
    HttpClientModule // ✅ Ajouté ici
  ],
  providers: [AdminService], // Ajouté AdminService dans la section providers
  exports: [
    AdminContenerComponent,
    DashboardComponent,
    DashboardSlideComponent // ✅ Exporté pour être utilisé ailleurs
  ]
})
export class AdminModule { }
