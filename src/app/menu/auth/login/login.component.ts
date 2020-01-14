import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import {ApiService} from '../../../api.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  conectado = true;
  mensajeInformacion: string;
  estaAutenticado = false;
  nombreMenu = 'Login';
  constructor(public authService: AuthService, private api: ApiService) {}
  ngOnInit(): void {
    this.api.checkConexion().subscribe(
      respuesta => {
        this.conectado = true;
        this.isLoading = false;
        this.authService.getAuthStatusListener().subscribe(resultado => {
          this.estaAutenticado = true;
          this.mensajeInformacion = 'Ya está autenticado, para desconectarse, pulse en el incono de verificado, arriba a la derecha. Para navegar a otros puntos de la aplicación selecciónelos desde el menú';
        });
      },
      error => {
        console.log('Error en la respuesta');
        this.conectado = false;
        this.isLoading = false;
        this.mensajeInformacion = 'No hay conexión en este momento, inténtelo de nuevo más tarde';
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
