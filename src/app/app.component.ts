import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // corregí styleUrl -> styleUrls
})
export class AppComponent implements OnInit {
  sidebarVisible = true;
  showSidebar = true;
  tiempoRestante: number = 0;

  constructor(private router: Router, private auth: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Rutas donde NO quieres mostrar la barra
        const noSidebarRoutes = ['/login', '/'];
        this.showSidebar = !noSidebarRoutes.includes(event.url);
      }
    });
  }

  ngOnInit(): void {
    // Obtener tiempo inicial
    this.tiempoRestante = this.auth.obtenerTiempoRestante();

    // Reducir cada minuto
    setInterval(() => {
      this.auth.decrementarTiempoRestante();
      this.tiempoRestante = this.auth.obtenerTiempoRestante();

      // Opcional: cerrar sesión si tiempo llega a 0
      if (this.tiempoRestante <= 0) {
        this.auth.cerrarSesion();
        // Redirigir al login
        this.router.navigate(['/login']);
      }
    }, 60000);
  }

  onSidebarStateChange(visible: boolean) {
    this.sidebarVisible = visible;
  }
}
