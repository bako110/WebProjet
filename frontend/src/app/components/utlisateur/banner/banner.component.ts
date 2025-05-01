import { Component, OnInit, OnDestroy } from '@angular/core';
import { VisibilityService } from 'src/app/services/visibility.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, OnDestroy {
  isVisible = false;
  isCategoriesOpen = false;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly visibilityService: VisibilityService) {}

  ngOnInit(): void {
    this.visibilityService.isVisible$
      .pipe(takeUntil(this.destroy$))
      .subscribe(visible => {
        this.isVisible = visible;
      });
  }

  toggleCategories(): void {
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
