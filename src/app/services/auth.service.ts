// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/auth';

  constructor(private http: HttpClient) {}

    private tiempoRestanteKey = 'tiempoRestante';

  login(correo: string, password: string): Observable<any> {
    const body = { correo, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  verificarCodigo(correo: string, codigo: string) {
  const body = { correo, codigo };
  return this.http.post(`${this.apiUrl}/verificar-codigo`, body);
}

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenerTiempoRestante(): number {
  if (typeof window === 'undefined' || !window.localStorage) return 0;
  const t = localStorage.getItem('tiempo_restante_min');
  return t ? parseInt(t, 10) : 0;
}

guardarTiempoRestante(tiempoMin: number): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('tiempo_restante_min', tiempoMin.toString());
  }
}

logoutYcerrarSesion(): void {
  // Limpiar localStorage inmediatamente
  this.cerrarSesion();

  const headers = this.obtenerCabecerasAutenticadas(); // aquí headers estará vacío si no hay token, y es correcto

  this.http.post(`${this.apiUrl}/logout`, {}, { headers }).subscribe({
    next: () => console.log('[AuthService] Logout en backend exitoso'),
    error: (err) => console.error('[AuthService] Error al cerrar sesión en backend:', err)
  });
}

cerrarSesion(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('token');
    localStorage.removeItem('tiempo_restante_min');
  }
}


  obtenerCabecerasAutenticadas(): HttpHeaders {
    const token = this.obtenerToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }



  decrementarTiempoRestante(): void {
    const tiempo = this.obtenerTiempoRestante();
    if (tiempo > 0) {
      this.guardarTiempoRestante(tiempo - 1);
    }
  }
}
