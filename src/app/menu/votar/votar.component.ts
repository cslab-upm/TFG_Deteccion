import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren, AfterViewInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {ApiService} from '../../api.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogoTutorialComponent} from './dialogo-tutorial/dialogo-tutorial.component';
import {environment} from '../../../environments/environment';
import {DialogoRechazarComponent} from './dialogo-rechazar/dialogo-rechazar.component';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';


@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.css']
})

export class VotarComponent implements OnInit, AfterViewInit {
  numeroDeColumnas = 1;
  anchoPantalla: number;
  altoPantalla: number;
  numColtest: number;
  altoDeFila: number;
  nombreMenu = 'Nombre Menu Inicial';
  divVideo: HTMLVideoElement;
  video = {
    id_video: 29,
    camara: 'XX',
    fecha: 'XX',
    hora: 'XX:XX:XX',
    ubicacion: 'http://' + environment.urlApi + '/api/media/eventos/cam43-UPM-MAD-2019-10-09--23-54-34/evento.mp4',
    favor: 0,
    contra: 0
  };
  isLoading = false;
  conectado = true;
  mensajeInformacion: string;
  mySubscription: any;
  valorCookie: string;
  motivoRechazo;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  esMovil = false;
  @ViewChildren('videoCard') videoCardList: QueryList<ElementRef>;

  @HostListener('window:resize', ['$event'])

  getScreenSize(event?) {

    this.anchoPantalla = window.innerWidth;
    this.altoPantalla = window.innerHeight;
    this.altoDeFila = 350;

    if (this.anchoPantalla > 3000) {
      this.numeroDeColumnas = 2;
      this.altoDeFila = this.altoPantalla - 64;
    } else {
      this.numeroDeColumnas = 1;
      this.altoDeFila = (this.altoPantalla - 56) / 2;
      console.log(this.numeroDeColumnas);
    }
    this.cambiarTamañoDiv();
  }
  tamanoInicial() {

    this.anchoPantalla = window.innerWidth;
    this.altoPantalla = window.innerHeight;
    this.altoDeFila = 350;

    if (this.anchoPantalla > 3000) {
      this.numeroDeColumnas = 2;
      this.altoDeFila = this.altoPantalla - 64;
    } else {
      this.numeroDeColumnas = 1;
      this.altoDeFila = (this.altoPantalla - 56) / 2;
    }

  }
  openDialog() {
    let ancho = 0;
    let alto = 0;
    if (this.anchoPantalla > 600) {
      ancho = 500; // (this.anchoPantalla - 200) / 4;
      alto = 300;
    } else {
      ancho = this.anchoPantalla;
      alto = 400;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = ancho + 'px';
    dialogConfig.height =  alto + 'px'; // this.altoPantalla / 2 + 'px';
    this.dialog.open(DialogoTutorialComponent, dialogConfig);
  }
  ngOnInit() {
    this.route.url.subscribe(urlActiva => {
      console.log(location.pathname);
    });
    this.api.checkConexion().subscribe(
      respuesta => {
        this.conectado = true;
        this.isLoading = false;
        this.api.getVideoForVoting().then(resultado => {
          // {id_video: res.Video[0].id_video, ubicacion: res.Video[0].ubicacion};
          const resVideo = {id_video: resultado.id_video, ubicacion: resultado.ubicacion, favor: resultado.favor,
            contra: resultado.contra};
          this.video.id_video = resVideo.id_video;
          this.video.ubicacion = 'http://' + environment.urlApi + '/api/media/eventos/' + resVideo.ubicacion + '/evento.mp4';
          this.video.camara = resVideo.ubicacion.split('-')[1] + '-' + resVideo.ubicacion.split('-')[2];
          this.video.fecha = resVideo.ubicacion.split('-')[3] + '-' + resVideo.ubicacion.split('-')[4] + '-' + resVideo.ubicacion.split('-')[5];
          this.video.hora = resVideo.ubicacion.split('--')[1];
          this.video.favor = resVideo.favor;
          this.video.contra = resVideo.contra;
          console.log('Contra:' + this.video.contra);
          const mySpan = document.getElementById('mySpan');
          mySpan.innerText = ' Capturado en ' + this.video.camara + ' el ' + this.video.fecha + ' a las ' + this.video.hora;
        });
        this.valorCookie = this.cookieService.get('hemos-estado-aqui');
        if ( this.valorCookie === 'si') {
          console.log('Ya hemos estado aqui, saltando intro');
        } else {
          this.openDialog();
          console.log('No hemos estado aqui, sacando intro');
          this.cookieService.set('hemos-estado-aqui', 'si');
        }
      },
      error => {
        console.log('Error en la respuesta');
        this.conectado = false;
        this.isLoading = false;
        this.mensajeInformacion = 'No hay conexión en este momento, inténtelo de nuevo más tarde';
      });
    this.isHandset$.subscribe(resultado => {
      if (resultado) {
        this.esMovil = true;
      } else {
        this.esMovil = false;
      }
    });
  }

  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, public snackBar: MatSnackBar, private route: ActivatedRoute, location: Location, router: Router, private api: ApiService, private cookieService: CookieService, private dialog: MatDialog) {
    router.events.subscribe(ruta => {
      if (location.isCurrentPathEqualTo('/videos', '')) {
        this.nombreMenu = 'Videos por votar';
      } else {
        if (location.isCurrentPathEqualTo('/completados', '')) {
          this.nombreMenu = 'Bolidos detectados';
        } else {
          if (location.isCurrentPathEqualTo('', '')) {
            this.nombreMenu = 'Videos por votar';
          } else {
            this.nombreMenu = location.path();
          }
        }
      }
    });
    this.tamanoInicial();
  }

  funcionVacia() {
  }
  funcionAceptar() {
    console.log('voto positivo registrado');
    let texto;
    if ( this.video.favor === 0) {
      texto = 'Gracias por tu voto! Has sido el primero en votar en este video  😁';
    } else {
      texto = 'Gracias por tu voto! Otros ' + this.video.favor + ' usuarios opinan como tú!';
    }
    const snackBarReg = this.snackBar.open(texto, 'OK', {
      duration: 3000
    });
    snackBarReg.onAction().subscribe(() => {
      console.log('Deshacer positivo');
    });
    this.api.votoPositivoVideo(this.video.id_video).subscribe(respuesta => {
      console.log(respuesta);
      window.location.reload();
    });

  }
  funcionRechazar() {
    const dialogRef = this.dialog.open(DialogoRechazarComponent, {
      width: '280px',
      data: {motivo: this.motivoRechazo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.motivoRechazo = result;
      console.log('voto negativo registrado:' + this.motivoRechazo);
      let texto;
      if ( this.video.contra === 0) {
        texto = 'Gracias por tu voto! Ha sido el primero voto en este video!  😁';
      } else {
        texto = 'Gracias por tu voto! Otros ' + this.video.contra + ' usuarios opinan como tú!';
      }
      const snackBarReg = this.snackBar.open(texto, 'OK', {
        duration: 3500
      });
      snackBarReg.onAction().subscribe(() => {
        this.api.votoNegativoVideo(this.video.id_video, this.motivoRechazo).subscribe(respuesta => {
          console.log(respuesta);
          window.location.reload();
        });
      });
      snackBarReg.afterDismissed().subscribe(() => {
        this.api.votoNegativoVideo(this.video.id_video, this.motivoRechazo).subscribe(respuesta => {
          console.log(respuesta);
          window.location.reload();
        });
      });
    });
  }
  funcionAyuda() {
    console.log('ayuda');
    this.openDialog();
  }
  funcionSaltar() {
    console.log('saltando');
    this.api.saltar(this.video.id_video).subscribe(respuesta => {
      console.log(respuesta);
      window.location.reload();
    });
  }
  cambiarTamañoDiv() {
    this.anchoPantalla = window.innerWidth;
    this.altoPantalla = window.innerHeight;
    this.divVideo = document.getElementById('video') as HTMLVideoElement;
    let anchoFila;
    let altoFila;
    let altoVideo;
    let anchoVideo;
    let izquierdaVideo;
    const ratio = 1.33;
    if (!this.esMovil) {
      anchoFila = this.anchoPantalla - 200;
      altoFila = this.altoDeFila;
      izquierdaVideo = 200;
    } else {
      anchoFila = this.anchoPantalla;
      altoFila = this.altoDeFila;
      izquierdaVideo = 0;
    }
    if ((altoFila * ratio) < anchoFila) {
      this.divVideo.style.height = altoFila + 'px';
      altoVideo = altoFila;
      anchoVideo = altoVideo * ratio;
      this.divVideo.style.width = anchoVideo + 'px';
      if ( this.esMovil) {
        izquierdaVideo = (anchoFila - anchoVideo) / 2;
      } else {
        izquierdaVideo = (anchoFila - anchoVideo) / 2 + 200;
      }
      altoVideo = 64;
    } else {
      this.divVideo.style.width = anchoFila + 'px';
      this.divVideo.style.height = anchoFila / ratio + 'px';
      altoVideo = this.altoDeFila / 2 - (anchoFila - 20) / (ratio * 2) + 56;

    }
    this.divVideo.style.left = izquierdaVideo + 'px';
    this.divVideo.style.top = altoVideo + 'px';
  }
  alerta() {
    console.log('Pulsado boton play');
    const botonPlay = document.getElementById('botonPlay');
    const video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement;
    video.style.display = 'inline';
    botonPlay.style.display = 'none';
    if (!document.fullscreenElement) {
      video.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      video.play();
      video.addEventListener('ended', this.volverInicio,false);
    } else {
      document.exitFullscreen();
    }
  }
  volverInicio(e) {
    const video = document.getElementById('video');
    const botonPlay = document.getElementById('botonEmpezar');
    const botonVer = document.getElementById('botonVerDeNuevo');
    botonPlay.style.display = 'none';
    botonVer.style.display = 'inline';
    document.exitFullscreen();
  }
  ngAfterViewInit() {
    this.cambiarTamañoDiv();
  }

}
