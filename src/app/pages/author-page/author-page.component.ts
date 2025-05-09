import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Author from '../../models/author.model';
import { catchError, first, map, Observable, of, Subscription } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { AuthorService } from '../../service/http/author.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToUpOverlayComponent } from '../../shared/to-up-overlay/to-up-overlay.component';
import { FileService } from '../../service/http/file.service';

@Component({
  selector: 'app-author-page',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SkeletonComponent,
    ToUpOverlayComponent,
    RouterLink,
  ],
  templateUrl: './author-page.component.html',
})
export class AuthorPageComponent implements OnInit {
  faBack = faArrowLeft;

  authorModel$!: Observable<Author>;
  coverModel$!: Observable<SafeUrl>;
  noImage = false;

  authorService = inject(AuthorService);
  fileService = inject(FileService);
  router = inject(Router);
  paramSubscription?: Subscription;
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params) => {
      this.authorModel$ = this.authorService.getAuthor(params['name']).pipe(
        first(),
        catchError(() => {
          this.router.navigate(['/notfound'], { skipLocationChange: true });
          return of(null as unknown as Author);
        }),
        map((value) => {
          this.coverModel$ = this.fileService.getAuthorProfile(value).pipe(
            first(),
            catchError((e, v) => {
              this.noImage = true;
              return v;
            })
          );
          return value;
        })
      );
    });
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }
}
