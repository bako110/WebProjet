import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpResponse } from '@angular/common/http';

// Interfaces pour structurer les données
interface Banner {
  title: string;
  image: File | null;
  description: string;
  ctaLink: string;
}

interface EventSection {
  title: string;
  image: File | null;
  description: string;
  date: string;
}

interface Ad {
  title: string;
  image: File | null;
  description: string;
  link: string;
}

interface Product {
  name: string;
  image: File | null;
  price: number;
  description: string;
}

interface Testimonial {
  author: string;
  image: File | null;
  testimonialText: string;
}

interface News {
  title: string;
  content: string;
  date: string;
  image: File | null;
}

interface Video {
  title: string;
  description: string;
  videoFile: File | null;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // Initialisation des modèles
  banner: Banner = { title: '', image: null, description: '', ctaLink: '' };
  event: EventSection = { title: '', image: null, description: '', date: '' };
  ad: Ad = { title: '', image: null, description: '', link: '' };
  product: Product = { name: '', image: null, price: 0, description: '' };
  testimonial: Testimonial = { author: '', image: null, testimonialText: '' };
  news: News = { title: '', content: '', date: '', image: null };
  video: Video = { title: '', videoFile: null, description: '' };

  sections = [
    { key: 'banner', title: 'Bannière' },
    { key: 'event', title: 'Événement' },
    { key: 'ad', title: 'Publicité' },
    { key: 'video', title: 'Vidéo' },
    { key: 'product', title: 'Produit' },
    { key: 'testimonial', title: 'Témoignage' },
    { key: 'news', title: 'Actualité' }
  ];

  visibleForms: { [key: string]: boolean } = {};

  constructor(private adminService: AdminService) {}

  toggleForm(sectionKey: string, event: Event): void {
    event.stopPropagation();
    this.visibleForms[sectionKey] = !this.visibleForms[sectionKey];
  }

  isFormVisible(sectionKey: string): boolean {
    return !!this.visibleForms[sectionKey];
  }

  onFileChange(event: Event, field: string): void {
    console.log('Fichier sélectionné:', event);  // Ajoutez cette ligne pour vérifier l'événement
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
  
    if (!file) {
      console.log('Aucun fichier sélectionné');
      return;
    }
  
    console.log('Fichier sélectionné:', file.name);  // Affiche le nom du fichier sélectionné
    
    if (file && !this.isValidFile(file)) {
      alert('Veuillez télécharger un fichier valide (JPEG, PNG, GIF ou MP4).');
      return;
    }
  
    switch (field) {
      case 'bannerImage':
        this.banner.image = file;
        break;
      case 'eventImage':
        this.event.image = file;
        break;
      case 'adImage':
        this.ad.image = file;
        break;
      case 'productImage':
        this.product.image = file;
        break;
      case 'testimonialImage':
        this.testimonial.image = file;
        break;
      case 'newsImage':
        this.news.image = file;
        break;
      case 'videoFile':
        this.video.videoFile = file;
        break;
    }
  }
  

  isValidFile(file: File): boolean {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    const maxSize = 50 * 1024 * 1024; // Exemple : taille max de 50 Mo
  
    if (file.size > maxSize) {
      alert('Le fichier est trop volumineux. La taille maximale est de 50 Mo.');
      return false;
    }
  
    return validImageTypes.includes(file.type) || validVideoTypes.includes(file.type);
  }
  
  submitForm(sectionKey: string): void {
    const formData = new FormData();
  
    // Ajout des données des différentes sections dans formData
    switch (sectionKey) {
      case 'banner':
        this.appendBannerForm(formData);
        console.log('FormData après ajout Banner:', formData);
        break;
      case 'event':
        this.appendEventForm(formData);
        console.log('FormData après ajout Event:', formData);
        break;
      case 'ad':
        this.appendAdForm(formData);
        console.log('FormData après ajout Ad:', formData);
        break;
      case 'video':
        this.appendVideoForm(formData);
        console.log('FormData après ajout Video:', formData);
        break;
      case 'product':
        this.appendProductForm(formData);
        console.log('FormData après ajout Product:', formData);
        break;
      case 'testimonial':
        this.appendTestimonialForm(formData);
        console.log('FormData après ajout Testimonial:', formData);
        break;
      case 'news':
        this.appendNewsForm(formData);
        console.log('FormData après ajout News:', formData);
        break;
    }
  
    // Vérification des données dans le FormData
    formData.forEach((value, key) => {
      console.log(`FormData contient ${key}:`, value);
    });
  
    // Soumettre la demande avec les données de formulaire
    switch (sectionKey) {
      case 'banner':
        this.submitRequest(formData, this.adminService.addBanner.bind(this.adminService), 'Bannière');
        break;
      case 'event':
        this.submitRequest(formData, this.adminService.addEvent.bind(this.adminService), 'Événement');
        break;
      case 'ad':
        this.submitRequest(formData, this.adminService.addAd.bind(this.adminService), 'Publicité');
        break;
      case 'video':
        this.submitRequest(formData, this.adminService.addVideo.bind(this.adminService), 'Vidéo');
        break;
      case 'product':
        this.submitRequest(formData, this.adminService.addProduct.bind(this.adminService), 'Produit');
        break;
      case 'testimonial':
        this.submitRequest(formData, this.adminService.addTestimonial.bind(this.adminService), 'Témoignage');
        break;
      case 'news':
        this.submitRequest(formData, this.adminService.addNews.bind(this.adminService), 'Actualité');
        break;
    }
  
    // Réinitialisation du formulaire après l'envoi
    this.resetForm(sectionKey);
    this.visibleForms[sectionKey] = false;
  }
  
  submitRequest(formData: FormData, serviceMethod: (data: FormData) => any, sectionName: string): void {
    serviceMethod(formData).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(`${sectionName} envoyée avec succès`);
        console.log('Réponse de l\'API:', response); 
        alert(`${sectionName} a été ajoutée avec succès !`);
      },
      error: (error: any) => {
        console.error(`Erreur lors de l'envoi de ${sectionName}`, error);
        alert(`Échec de l'ajout de ${sectionName}. Veuillez réessayer.`);
      }
    });
  }

  resetForm(sectionKey: string): void {
    switch (sectionKey) {
      case 'banner':
        this.banner = { title: '', image: null, description: '', ctaLink: '' };
        break;
      case 'event':
        this.event = { title: '', image: null, description: '', date: '' };
        break;
      case 'ad':
        this.ad = { title: '', image: null, description: '', link: '' };
        break;
      case 'video':
        this.video = { title: '', videoFile: null, description: '' };
        break;
      case 'product':
        this.product = { name: '', image: null, price: 0, description: '' };
        break;
      case 'testimonial':
        this.testimonial = { author: '', image: null, testimonialText: '' };
        break;
      case 'news':
        this.news = { title: '', content: '', date: '', image: null };
        break;
    }
  }

  expandSection(sectionKey: string, event: Event): void {
    event.stopPropagation();
  }

  // Fonctions d'assemblage des FormData
  private appendBannerForm(formData: FormData): void {
    formData.append('title', this.banner.title);
    formData.append('description', this.banner.description);
    formData.append('ctaLink', this.banner.ctaLink);
    if (this.banner.image) {
      formData.append('image', this.banner.image, this.banner.image.name);
    }
  }

  private appendEventForm(formData: FormData): void {
    formData.append('title', this.event.title);
    formData.append('description', this.event.description);
    formData.append('date', this.event.date);
    if (this.event.image) {
      formData.append('image', this.event.image, this.event.image.name);
    }
  }

  private appendAdForm(formData: FormData): void {
    formData.append('title', this.ad.title);
    formData.append('description', this.ad.description);
    formData.append('link', this.ad.link);
    if (this.ad.image) {
      formData.append('image', this.ad.image, this.ad.image.name);
    }
  }

  private appendVideoForm(formData: FormData): void {
    if (this.video.title && this.video.description) {
      formData.append('title', this.video.title);
      formData.append('description', this.video.description);
    }
    if (this.video.videoFile) {
      formData.append('video', this.video.videoFile, this.video.videoFile.name);
    }
  }

  private appendProductForm(formData: FormData): void {
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    if (this.product.image) {
      formData.append('image', this.product.image, this.product.image.name);
    }
  }

  private appendTestimonialForm(formData: FormData): void {
    formData.append('author', this.testimonial.author);
    formData.append('testimonialText', this.testimonial.testimonialText);
    if (this.testimonial.image) {
      formData.append('image', this.testimonial.image, this.testimonial.image.name);
    }
  }

  private appendNewsForm(formData: FormData): void {
    formData.append('title', this.news.title);
    formData.append('content', this.news.content);
    formData.append('date', this.news.date);
    if (this.news.image) {
      formData.append('image', this.news.image, this.news.image.name);
    }
  }
}
