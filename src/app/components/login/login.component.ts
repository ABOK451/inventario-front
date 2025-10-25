import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  codigo: string = '';
  mensaje: string = '';
  pasoCodigo: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    console.log('[LoginComponent] Intentando login con:', { correo: this.correo, password: this.password });

    if (!this.correo || !this.password) {
      this.mensaje = 'Por favor ingresa correo y contraseña.';
      return;
    }

    this.authService.login(this.correo, this.password).subscribe({
      next: (res) => {
        console.log('[LoginComponent] Respuesta del servidor:', res);
        if (res.codigo === 0) {
          this.mensaje = 'Código de verificación enviado a tu correo.';
          this.pasoCodigo = true; // Mostramos la pantalla de código
        } else {
          this.mensaje = res.error?.mensaje || 'Error al iniciar sesión.';
        }
      },
      error: (err) => {
        console.error('[LoginComponent] Error de login:', err);
        this.mensaje = 'Ocurrió un error en el servidor.';
      }
    });
  }

  // Segundo paso: verificar código
  onVerificarCodigo() {
    if (!this.codigo) {
      this.mensaje = 'Por favor ingresa el código de verificación.';
      return;
    }

    this.authService.verificarCodigo(this.correo, this.codigo).subscribe({
  next: (res: any) => {  // <-- 'any' permite acceder a cualquier propiedad
    console.log('[LoginComponent] Respuesta verificación:', res);

    if (res.codigo === 0) {
      this.mensaje = 'Verificación exitosa. ¡Bienvenido!';
      this.router.navigate(['/inicio']);
    } else {
      this.mensaje = res.error?.mensaje || 'Código incorrecto.';
    }
  },
  error: (err) => {
    console.error('[LoginComponent] Error verificación:', err);
    this.mensaje = 'Ocurrió un error en el servidor.';
  }
});

  }
}
