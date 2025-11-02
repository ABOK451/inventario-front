import { Component } from '@angular/core';
import { RecuperarService } from '../../services/recuperar.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {

  correo: string = '';
  codigo: string = '';
  nuevaPassword: string = '';
  codigoSolicitado: boolean = false; // Paso 2

  // Propiedades de notificación
  notificacionVisible = false;
  notificacionMensaje = '';
  notificacionTipo: 'success' | 'error' = 'success';

  constructor(private recuperarService: RecuperarService) {}

  solicitarCodigo() {
    this.recuperarService.solicitarReset(this.correo).subscribe({
      next: res => {
        this.mostrarNotificacion(
          res.mensaje + (res.otp ? ` (OTP: ${res.otp})` : ''),
          'success'
        );
        if (res.codigo === 0) {
          this.codigoSolicitado = true; // Activar paso 2
        }
      },
      error: err => this.mostrarNotificacion('Error solicitando código', 'error')
    });
  }

  restablecerPassword() {
    this.recuperarService.resetConCodigo(this.correo, this.codigo, this.nuevaPassword).subscribe({
      next: res => {
        this.mostrarNotificacion(res.mensaje, 'success');
        if (res.codigo === 0) {
          this.codigoSolicitado = false; // Reiniciar después de éxito
          this.codigo = '';
          this.nuevaPassword = '';
        }
      },
      error: err => this.mostrarNotificacion('Error al restablecer contraseña', 'error')
    });
  }

  mostrarNotificacion(mensaje: string, tipo: 'success' | 'error' = 'success') {
    this.notificacionMensaje = mensaje;
    this.notificacionTipo = tipo;
    this.notificacionVisible = true;

    setTimeout(() => this.notificacionVisible = false, 5000);
  }
}
