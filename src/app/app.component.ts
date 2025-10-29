import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sidebarVisible = true;
  showSidebar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Rutas donde NO quieres mostrar la barra
        const noSidebarRoutes = ['/login', '/'];
        this.showSidebar = !noSidebarRoutes.includes(event.url);
      }
    });
  }

   onSidebarStateChange(visible: boolean) {
    this.sidebarVisible = visible;
  }
}
