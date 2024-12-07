import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../service/http/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  constructor(private service: UserService) {}
  ngOnInit(): void {
    this.subscription = this.service.Auth().subscribe();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
