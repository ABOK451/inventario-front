import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
})
export class BarraComponent {
  @Input() sidebarCollapsed: boolean = false;
  @Output() sidebarToggled = new EventEmitter<void>();
  @Output() sidebarStateChange = new EventEmitter<boolean>();
  sidebarVisible = true;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarToggled.emit();
    this.sidebarVisible = !this.sidebarVisible;
    this.sidebarStateChange.emit(this.sidebarVisible);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
