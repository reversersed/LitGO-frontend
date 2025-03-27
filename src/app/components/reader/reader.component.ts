import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as EPUB from 'epubjs';
import Section from 'epubjs/types/section';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './reader.component.html',
})
export class ReaderComponent implements OnInit, OnDestroy {
  @Input() allowFullRead!: boolean;
  @Input() bookFileUrl!: string;

  router = inject(Router);
  route = inject(ActivatedRoute);

  book!: EPUB.Book;
  rendition!: EPUB.Rendition;

  currentSection = 0;
  totalSections = 0;
  sections: string[] = [];

  isLoading = true;

  faSpinner = faSpinner;

  paramsSubscription?: Subscription;

  async ngOnInit(): Promise<void> {
    try {
      this.book = EPUB.default(this.bookFileUrl);
      this.rendition = this.book.renderTo('reader', {
        height: '96%',
        width: '100%',
        allowScriptedContent: true,
        flow: 'scrolled',
        spread: 'none',
        overflow: 'auto',
      });
      this.rendition.themes.default('reader.css');
      await this.book.loaded.spine;

      this.book.spine.each((s: Section) => {
        this.sections.push(s.href);
        this.totalSections++;
      });

      await this.rendition.display();
    } catch (err) {
      this.router.navigate(['/notfound']);
    } finally {
      this.isLoading = false;
    }

    this.paramsSubscription = this.route.queryParams.subscribe({
      next: (params) => {
        if (params['page'] === undefined) this.setQueryPageParam(1);

        this.currentSection = params['page'] as number;
        this.applyPage(this.currentSection);
      },
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

  async applyPage(idx: number) {
    const index = idx - 1;
    if (index < 0 || index >= this.totalSections) return;

    this.currentSection = index;
    await this.rendition?.display(this.sections[index]);
  }

  nextPage() {
    this.setQueryPageParam(this.currentSection + 2);
  }

  setQueryPageParam(index: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: index },
      queryParamsHandling: 'merge',
    });
  }
}
