import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent {
 @Output() sidebarStateChange = new EventEmitter<boolean>(); 
  sidebarVisible = true;

  constructor(private router: Router) {}


  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.sidebarStateChange.emit(this.sidebarVisible); 
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
