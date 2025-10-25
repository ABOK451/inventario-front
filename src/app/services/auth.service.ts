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

  cerrarSesion(): void {
    localStorage.removeItem('token');
  }

  obtenerCabecerasAutenticadas(): HttpHeaders {
    const token = this.obtenerToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
