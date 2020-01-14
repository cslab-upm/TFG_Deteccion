import {Component, OnInit, ViewChildren} from '@angular/core';
import { ViewChild } from '@angular/core';
import {MatRadioButton} from '@angular/material/radio';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'app-dialogo-tutorial',
  templateUrl: './dialogo-tutorial.component.html',
  styleUrls: ['./dialogo-tutorial.component.css']
})
export class DialogoTutorialComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  value = 20;
  atrasDisabled = true;
  alanteDisabled = false;
  i;
  ubicacion1 = 'http://' + environment.urlApi + '/api/media/eventos/cam43-UPM-MAD-2019-10-16--21-30-47/evento.mp4';
  ubicacion2 = 'http://' + environment.urlApi + '/api/media/eventos/cam43-UPM-MAD-2019-10-16--00-37-22/evento.mp4';
  ubiaccion3 = 'http://' + environment.urlApi + '/api/media/eventos/cam43-UPM-MAD-2019-10-16--21-33-20/evento.mp4';
  tutorial = [
    {
      imagen: '/assets/icons/Tutorial1.jpeg',
      tipo: '/image/jpeg',
      texto: 'Bienvenido a la aplicación de Detección de Bólidos! \n' +
        'El objetivo de esta aplicación es que nos ayudes a identificar bólidos en los vídeos que te vamos a mostrar. \n' +
        'A continuación te mostraremos unos vídeos de ejemplo para que sepas qué no es un bólido'
    },
    {
      imagen: '/assets/icons/Tutorial1.jpeg',
      tipo: '/video/mp4',
      texto: 'En este primer vídeo puedes ver un avión sobrepasando el cielo.\n' +
        'Sabemos que es un avión porque parpadea'
    },
    {
      imagen: '/assets/icons/Tutorial1.jpeg',
      tipo: '/video/mp4',
      texto: 'En este segundo vídeo puedes ver los efectos sobre la cámara de un rayo.\n' +
        'Sabemos que es un rayo porque se produce un cambio súbito en la luz de la imagen, en algunos casos también se verá el propio rayo'
    },
    {
      imagen: '/assets/icons/Tutorial1.jpeg',
      tipo: '/video/mp4',
      texto: 'En este tercer vídeo podrás ver el paso de la Estacion Espacial Internacional (ISS).\n' +
        'Sabemos que es la ISS porque es brillante, grande y se puede intuir su forma'
    },
    {
      imagen: '/assets/icons/Tutorial5.jpeg',
      tipo: '/image/jpeg',
      texto: 'Muchas gracias por tu atención y ayuda!\n' +
        'Suerte!\n' +
        'Pulsa fuera del diálogo para comenzar.'
    }
  ];
  constructor(private dialogRef: MatDialogRef<DialogoTutorialComponent>
  ) { }
  ngOnInit() {
    this.i = 0;
    this.value = 20;
  }
  siguiente() {
    const video2 = document.getElementById('Tutorial2');
    const video3 = document.getElementById('Tutorial3');
    const video4 = document.getElementById('Tutorial4');
    const imagen = document.getElementById('imagen');
    const iLocal = this.i;
    switch (iLocal) {
      case 0:
        this.value = 40;
        imagen.style.display = 'none';
        video2.style.display = 'inline';
        this.atrasDisabled = false;
        break;
      case 1:
        this.value = 60;
        video2.style.display = 'none';
        video3.style.display = 'inline';
        break;
      case 2:
        this.value = 80;
        video3.style.display = 'none';
        video4.style.display = 'inline';
        break;
      case 3:
        this.value = 100;
        video4.style.display = 'none';
        imagen.style.display = 'inline';
        break;
      default:
        this.dialogRef.close();
        break;
    }
    this.i++;
  }
  anterior() {
    const video2 = document.getElementById('Tutorial2');
    const video3 = document.getElementById('Tutorial3');
    const video4 = document.getElementById('Tutorial4');
    const imagen = document.getElementById('imagen');
    const atras = document.getElementById('atras');
    this.i--;
    const iLocal = this.i;
    switch (iLocal) {
      case 0:
        this.value = 20;
        imagen.style.display = 'inline';
        video2.style.display = 'none';
        this.atrasDisabled = false;
        break;
      case 1:
        this.value = 40;
        imagen.style.display = 'none';
        video2.style.display = 'inline';
        video3.style.display = 'none';
        break;
      case 2:
        this.value = 60;
        video2.style.display = 'none';
        video3.style.display = 'inline';
        video4.style.display = 'none';
        break;
      case 3:
        this.value = 80;
        video3.style.display = 'none';
        video4.style.display = 'inline';
        imagen.style.display = 'none';
        break;
      case 4:
        this.value = 100;
        video4.style.display = 'none';
        imagen.style.display = 'inline';
        break;
      default:
        this.dialogRef.close();
        break;
    }

  }

}
