import { AuthService } from './../../services/auth.service';
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
    console.log('[BarraComponent] Toggle sidebar');
    this.sidebarToggled.emit();
  }

  logout() {
    console.log('[BarraComponent] Logout clicked'); // Log para depuración
    this.authService.logoutYcerrarSesion();          // Cierra sesión y borra token/tiempo
    console.log('[BarraComponent] Token y tiempo eliminados');
    this.router.navigate(['/login']);
  }

}
