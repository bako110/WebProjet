import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VisibilityService } from 'src/app/services/visibility.service';  
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-contenu-accueil',
  templateUrl: './contenu-accueil.component.html',
  styleUrls: ['./contenu-accueil.component.css']
})
export class ContenuAccueilComponent implements OnInit, OnDestroy, AfterViewInit {
  isBannerVisible = false;
  private readonly destroy$ = new Subject<void>();

  banners: any[] = [];
  events: any[] = [];
  ads: any[] = [];
  videos: any[] = [];
  products: any[] = [];
  testimonials: any[] = [];
  news: any[] = [];

  @ViewChildren('videoElement') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;
  private observer!: IntersectionObserver;

  constructor(
    private readonly visibilityService: VisibilityService,
    private readonly utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.visibilityService.isVisible$
      .pipe(takeUntil(this.destroy$))
      .subscribe(visible => {
        this.isBannerVisible = visible;
      });

    this.loadAllContent();
  }

  ngAfterViewInit(): void {
    this.initVideoObserver();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initVideoObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play().catch(error => console.error('Erreur lecture vidéo:', error));
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 }); // 50% du player doit être visible

    this.videoElements.changes.subscribe(() => {
      this.videoElements.forEach(videoElement => {
        this.observer.observe(videoElement.nativeElement);
      });
    });

    // Pour les vidéos déjà présentes au début
    this.videoElements.forEach(videoElement => {
      this.observer.observe(videoElement.nativeElement);
    });
  }

  private loadAllContent(): void {
    this.loadBanners();
    this.loadEvents();
    this.loadAds();
    this.loadVideos();
    this.loadProducts();
    this.loadTestimonials();
    this.loadNews();
  }

  private loadBanners(): void {
    this.utilisateurService.getBannieres().subscribe(data => {
      console.log('Données témoignages reçues:', data);
      this.banners = data.map(banner => ({
        ...banner,
        imageUrl: banner.image ? `http://localhost:3000/uploads/${banner.image}` : null
      }));
    });
  }

  private loadEvents(): void {
    this.utilisateurService.getEvenements().subscribe(data => {
      this.events = data.map(event => ({
        ...event,
        imageUrl: event.image ? `http://localhost:3000/uploads/${event.image}` : null
      }));
    });
  }

  private loadAds(): void {
    this.utilisateurService.getPublicites().subscribe(data => {
      this.ads = data.map(ad => ({
        ...ad,
        imageUrl: ad.image ? `http://localhost:3000/uploads/${ad.image}` : null
      }));
    });
  }

  private loadVideos(): void {
    this.utilisateurService.getVideos().subscribe(data => {
      this.videos = data.map(video => ({
        ...video,
        videoUrl: video.videoUrl || '',
        posterUrl: video.image ? `http://localhost:3000/uploads/${video.image}` : null
      }));
    });
  }

  private loadProducts(): void {
    this.utilisateurService.getProduits().subscribe(data => {
      this.products = data.map(product => ({
        ...product,
        imageUrl: product.image ? `${this.utilisateurService.apiBaseUrl}/${product.image}` : null
      }));
    });
  }

  private loadTestimonials(): void {
    this.utilisateurService.getTemoignages().subscribe(data => {
      console.log('Données témoignages reçues:', data);
      this.testimonials = data.map(testimonial => ({
        ...testimonial,
        imageUrl: testimonial.image ? `http://localhost:3000/uploads/${testimonial.image}` : null
      }));
    });
  }

  private loadNews(): void {
    this.utilisateurService.getActualites().subscribe(data => {
      console.log('Données témoignages reçues:', data);
      this.news = data.map(newsItem => ({
        ...newsItem,
        imageUrl: newsItem.image ? `http://localhost:3000/uploads/${newsItem.image}` : null
      }));
    });
  }
}
