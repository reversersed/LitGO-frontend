import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollMutexService {
  private originalOverflow = document.body.style.overflow;

  Lock() {
    document.body.style.overflow = 'hidden';
  }

  Unlock() {
    document.body.style.overflow = this.originalOverflow;
  }
}
