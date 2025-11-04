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
  pasoCodigo: boolean = false;

  // Propiedades de notificación
  notificacionVisible = false;
  notificacionMensaje = '';
  notificacionTipo: 'success' | 'error' = 'success';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.correo || !this.password) {
      this.mostrarNotificacion('Por favor ingresa correo y contraseña.', 'error');
      return;
    }



    this.authService.login(this.correo, this.password).subscribe({
      next: (res: any) => {
  if (res.codigo === 0) {
  if (res.mensaje?.includes('modo offline')) {
    this.mostrarNotificacion(`Código de verificación generado en modo offline: ${res.otp}`, 'success');
    this.pasoCodigo = true; // opcional, si quieres que pase al paso de verificación
    console.log('OTP generado offline:', res.otp); // útil para debug
  } else if (res.mensaje?.includes('Ya existe una sesión activa')) {
    this.guardarTokenYRedirigir(res.token);
    return;
  } else {
    this.pasoCodigo = true;
    this.mostrarNotificacion('Código de verificación enviado a tu correo.', 'success');
  }
} else {
  let mensajes: string[] = [];
  if (Array.isArray(res.error?.detalle)) {
    mensajes = res.error.detalle.map((e: any) => e.mensaje);
  } else if (res.error?.mensaje) {
    mensajes = [res.error.mensaje];
  } else {
    mensajes = ['Error al iniciar sesión.'];
  }
  this.mostrarNotificacion(mensajes.join('\n'), 'error');
}

      },
    });
  }

  onVerificarCodigo() {
  if (!this.codigo) {
    this.mostrarNotificacion('Por favor ingresa el código de verificación.', 'error');
    return;
  }

  this.authService.verificarCodigo(this.correo, this.codigo).subscribe({
    next: (res: any) => {
      if (res.codigo === 0) {
        // Mostrar mensaje de modo offline si aplica
        if (res.mensaje?.includes('modo offline')) {
          this.mostrarNotificacion(res.mensaje, 'success');
          console.log('OTP generado offline:', res.otp); // opcional para debug
        } else {
          this.guardarTokenYRedirigir(res.token);

          if (res.tiempo_restante_min !== undefined) {
            this.mostrarNotificacion(
              `Autenticación exitosa. Te quedan ${res.tiempo_restante_min} minutos de sesión.`,
              'success'
            );
          }
        }
      } else {
        let errores = 'Código incorrecto.';
        if (Array.isArray(res.error?.detalle)) {
          errores = res.error.detalle.map((e: any) => e.mensaje).join(', ');
        } else if (res.error?.mensaje) {
          errores = res.error.mensaje;
        }
        this.mostrarNotificacion(errores, 'error');
      }
    },
    error: () => {
      this.mostrarNotificacion('Ocurrió un error en el servidor.', 'error');
    }
  });
}


  private guardarTokenYRedirigir(token: string) {
    localStorage.setItem('token', token);

    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const rol = payload.rol;

    this.mostrarNotificacion(`Sesión iniciada como ${rol}. Redirigiendo...`, 'success');

    if (rol === 'admin') this.router.navigate(['/admin']);
    else this.router.navigate(['/personal']);
  }

  mostrarNotificacion(mensaje: string, tipo: 'success' | 'error' = 'success') {
    this.notificacionMensaje = mensaje;
    this.notificacionTipo = tipo;
    this.notificacionVisible = true;

    setTimeout(() => this.notificacionVisible = false, 5000);
  }
}
