import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  template: `
    <div *ngIf="visible" class="notificacion" [ngClass]="[tipo, showClass]">
      <ng-container *ngIf="errores.length > 0">
        <div *ngFor="let e of errores">{{ e }}</div>
      </ng-container>

      <ng-container *ngIf="tipo === 'success' && errores.length === 0">
        {{ mensaje }}
      </ng-container>
    </div>
  `,
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnChanges {
  @Input() visible = false;
  @Input() mensaje = '';
  @Input() tipo: 'success' | 'error' = 'success';

  errores: string[] = [];
  showClass = 'show';

  ngOnChanges() {
    if (this.visible) {
      // Separar los mensajes por salto de línea y eliminar duplicados
      const mensajes = this.mensaje.split(/\n|,/).map(m => m.trim()).filter(m => m);
      this.errores = Array.from(new Set(mensajes)); // quita duplicados
      this.showClass = 'show';

      // Ocultar automáticamente después de 5 segundos
      setTimeout(() => this.showClass = 'hide', 5000);
    }
  }
}
