import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import * as EPUB from 'epubjs';
import Section from 'epubjs/types/section';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './reader.component.html',
})
export class ReaderComponent implements OnInit, OnDestroy, OnChanges {
  @Input() allowFullRead!: boolean;
  @Input() bookFileUrl!: ArrayBuffer;
  @Input() currentChapter?: EPUB.NavItem;
  @Output() bookContent = new EventEmitter<EPUB.NavItem[]>();

  router = inject(Router);
  route = inject(ActivatedRoute);

  book!: EPUB.Book;
  rendition!: EPUB.Rendition;

  currentSection = 0;
  totalSections = 0;
  sections: string[] = [];

  isLoading = true;

  faSpinner = faSpinner;
  faBack = faAngleLeft;
  faForward = faAngleRight;

  paramsSubscription?: Subscription;
  selectedChapter?: EPUB.NavItem;

  async ngOnInit(): Promise<void> {
    try {
      this.book = EPUB.default(this.bookFileUrl);
      await this.book.ready;
      this.rendition = this.book.renderTo('reader', {
        height: '96%',
        width: '100%',
        allowScriptedContent: true,
        flow: 'scrolled',
        spread: 'none',
        overflow: 'auto',
      });
      if (this.isDarkTheme()) this.rendition.themes.default('reader.dark.css');
      else this.rendition.themes.default('reader.css');
      await this.book.loaded.spine;
      await this.book.loaded.navigation;

      if (this.book.navigation.toc.length > 0) {
        this.bookContent.emit(this.book.navigation.toc);
      }
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
        if (params['page'] === undefined) {
          this.currentSection = 0;
          this.selectedChapter = undefined;
          this.setQueryPageParam();
          return;
        }

        this.currentSection = (params['page'] as number) - 1;
        this.applyPage();
      },
    });
  }

  ngOnDestroy(): void {
    console.log(this.currentSection);
    this.book.destroy();
    this.paramsSubscription?.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentChapter'] && this.currentChapter) {
      this.setChapter(this.currentChapter);
    }
  }

  async applyPage() {
    const index = this.currentSection;
    if (index < 0 || index >= this.totalSections) return;

    if (this.selectedChapter)
      await this.rendition?.display(this.selectedChapter.href);
    else await this.rendition?.display(this.sections[index]);
  }

  nextPage() {
    if (this.currentSection >= this.totalSections - 1) return;
    this.selectedChapter = undefined;
    this.currentSection += 1;
    this.setQueryPageParam();
  }
  prevPage() {
    if (this.currentSection === 0) return;
    this.selectedChapter = undefined;
    this.currentSection -= 1;
    this.setQueryPageParam();
  }
  setPage(page: number) {
    this.currentSection = page - 1;
    this.setQueryPageParam();
  }

  setQueryPageParam() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentSection + 1 },
      queryParamsHandling: 'merge',
    });
  }
  setChapter(chapter: EPUB.NavItem) {
    const section = this.sections.indexOf(chapter.href.split('#')[0]);
    if (section === undefined) {
      this.router.navigate(['/notfound']);
      return;
    }
    this.selectedChapter = chapter;
    this.currentSection = section;
    this.setQueryPageParam();
    this.applyPage();
  }
  isDarkTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
