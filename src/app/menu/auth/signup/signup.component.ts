import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {ApiService} from '../../../api.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  conectado = true;
  mensajeInformacion: string;
  estaAutenticado = false;
  registrado = false;
  nombreMenu = 'Date de alta';
  constructor(public authService: AuthService, private api: ApiService) {}
  ngOnInit(): void {
    this.api.checkConexion().subscribe(
      respuesta => {
        this.conectado = true;
        this.isLoading = false;
        this.authService.getAuthStatusListener().subscribe(resultado => {
          this.estaAutenticado = true;
          this.mensajeInformacion = 'Ya esta autenticado, para desconectarse, pulse en el incono de verificado, arriba a la derecha. Para navegar a otros puntos de la aplicación seleccionelos desde el menu';
        });
      },
      error => {
        console.log('Error en la respuesta');
        this.conectado = false;
        this.isLoading = false;
        this.mensajeInformacion = 'No hay conexión en este momento, intentelo de nuevo más tarde';
      });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password).subscribe(respuesta => {
      this.isLoading = false;
      this.registrado = true;
      console.log(respuesta);
    });
  }
}
