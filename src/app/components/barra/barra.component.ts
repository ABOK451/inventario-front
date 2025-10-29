import { AuthService } from './../../services/auth.service';
import { authGuard } from './../../guards/auth.guard';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
})
export class BarraComponent {
  @Input() sidebarCollapsed: boolean = false;
  @Output() sidebarToggled = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {}

  toggleSidebar() {
    this.sidebarToggled.emit();
  }

  logout() {
    this.authService.logoutYcerrarSesion();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
