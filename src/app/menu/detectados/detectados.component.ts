import {Component, HostListener, ViewChildren, ElementRef, QueryList, OnInit} from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {MatSelectChange, MatSnackBar} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {ApiService} from '../../api.service';
import {PageEvent} from '@angular/material/paginator';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {formatDate } from '@angular/common';
import {AuthService} from '../auth/auth.service';
export interface Filtro {
  value: string;
  valorVista: string;
}
interface Ratio {
  ratio: number;
  votos: number;
}
interface ObjetoVideo {
  id_video: number;
  camara: number;
  fecha: string;
  hora: string;
  ubicacion: string;
}
interface TarjetaVideo {
  title: string;
  camara: string;
  fecha: string;
  hora: string;
  contra: number;
  favor: number;
  id: number;
  ubicacion: string;
  cols: number;
  rows: number;
}
@Component({
  selector: 'app-detectados',
  templateUrl: './detectados.component.html',
  styleUrls: ['./detectados.component.css']
})

export class DetectadosComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  numeroDeColumnas = 1;
  anchoPantalla: number;
  altoPantalla: number;
  altoFila: number;
  numColtest: number;
  lastId: number;
  nombreMenu =  'Nombre Menu Inicial';
  arrayLocalVideos;
  camara1: Filtro[] = [
    {value: '43' , valorVista: 'UPM Madrid'},
    {value: '40' , valorVista: 'Sor Paris'},
    {value: '35' , valorVista: 'IK Londres'}
  ];
  ratios: Filtro[] = [
    {value: '0.6' , valorVista: '>60%'},
    {value: '0.7' , valorVista: '>70%'},
    {value: '0.8' , valorVista: '>80%'},
    {value: '0.9' , valorVista: '>90%'},
    {value: '1' , valorVista: '100%'}
  ];
  horasInicio: Filtro[] = [
    {value: '00:00' , valorVista: '>00:00'},
    {value: '01:00' , valorVista: '>01:00'},
    {value: '02:00' , valorVista: '>02:00'},
    {value: '03:00' , valorVista: '>03:00'},
    {value: '04:00' , valorVista: '>04:00'},
    {value: '05:00' , valorVista: '>05:00'},
    {value: '06:00' , valorVista: '>06:00'},
    {value: '07:00' , valorVista: '>07:00'},
    {value: '08:00' , valorVista: '>08:00'},
    {value: '09:00' , valorVista: '>09:00'},
    {value: '10:00' , valorVista: '>10:00'},
    {value: '11:00' , valorVista: '>11:00'},
    {value: '12:00' , valorVista: '>12:00'},
    {value: '13:00' , valorVista: '>13:00'},
    {value: '14:00' , valorVista: '>14:00'},
    {value: '15:00' , valorVista: '>15:00'},
    {value: '16:00' , valorVista: '>16:00'},
    {value: '17:00' , valorVista: '>17:00'},
    {value: '18:00' , valorVista: '>18:00'},
    {value: '19:00' , valorVista: '>19:00'},
    {value: '20:00' , valorVista: '>20:00'},
    {value: '21:00' , valorVista: '>21:00'},
    {value: '22:00' , valorVista: '>22:00'},
    {value: '23:00' , valorVista: '>23:00'},

  ];
  horasFin: Filtro[] = [
    {value: '00:00' , valorVista: '<00:00'},
    {value: '01:00' , valorVista: '<01:00'},
    {value: '02:00' , valorVista: '<02:00'},
    {value: '03:00' , valorVista: '<03:00'},
    {value: '04:00' , valorVista: '<04:00'},
    {value: '05:00' , valorVista: '<05:00'},
    {value: '06:00' , valorVista: '<06:00'},
    {value: '07:00' , valorVista: '<07:00'},
    {value: '08:00' , valorVista: '<08:00'},
    {value: '09:00' , valorVista: '<09:00'},
    {value: '10:00' , valorVista: '<10:00'},
    {value: '11:00' , valorVista: '<11:00'},
    {value: '12:00' , valorVista: '<12:00'},
    {value: '13:00' , valorVista: '<13:00'},
    {value: '14:00' , valorVista: '<14:00'},
    {value: '15:00' , valorVista: '<15:00'},
    {value: '16:00' , valorVista: '<16:00'},
    {value: '17:00' , valorVista: '<17:00'},
    {value: '18:00' , valorVista: '<18:00'},
    {value: '19:00' , valorVista: '<19:00'},
    {value: '20:00' , valorVista: '<20:00'},
    {value: '21:00' , valorVista: '<21:00'},
    {value: '22:00' , valorVista: '<22:00'},
    {value: '23:00' , valorVista: '<23:00'},

  ];
  isLoading = false;
  // MatPaginator Inputs
  length = 100;
  pageSize = 7;
  pageSizeOptions: number[] = [5, 10, 20, 100];
  cards: TarjetaVideo[] = [];
  // MatPaginator Output
  pageEvent: PageEvent;
  camara = false;
  fechaIni = 'false';
  fechaFin = 'false';
  ratio = false;
  horaIni = false;
  horaFin = false;
  math = Math;
  ids = [];
  formatterFecha = formatDate;
  logado = false;
  ratioAprobacion;
  votosAprobacion;
  mensajeInformacion: string;
  conectado = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  esMovil = false;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.altoFila = 380;
    this.anchoPantalla = window.innerWidth;
    this.altoPantalla = window.innerHeight;
    if (!this.esMovil) {
      this.numeroDeColumnas = this.anchoPantalla - 200; // 200 es el ancho del menu
      this.altoFila = this.numeroDeColumnas;
      this.numeroDeColumnas = this.numeroDeColumnas / 434; // 300 es el ancho minimo q queremos que tengan las tarjetas
      this.numeroDeColumnas = Math.floor(this.numeroDeColumnas);
      if ( this.numeroDeColumnas > 0) {
        this.altoFila = 36 + 65 + (this.altoFila / this.numeroDeColumnas) / 1.32;
      } else {
        this.altoFila = 36 + 65 + (this.altoFila / 1) / 1.32;
      }
    } else {
      this.numeroDeColumnas = this.numeroDeColumnas / 300;
      this.numeroDeColumnas = Math.floor(this.numeroDeColumnas);
      if (this.anchoPantalla < 350) {
        this.altoFila = 45 + 120 + (this.anchoPantalla - 20) / 1.32;
      } else {
        this.altoFila = 45 + 105 + (this.anchoPantalla - 20) / 1.32;
      }
    }

  }
  ngOnInit() {
    this.isLoading = true;
    this.mensajeInformacion = 'Espere un momento mientras cargamos los datos';
    this.route.url.subscribe(urlActiva => {
      console.log(location.pathname);
    });
    this.api.checkConexion().subscribe(
      respuesta => {
        console.log('Respuesta API en componente:' + respuesta);
        this.api.getTotal(this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin).subscribe(resultado => {
          this.length = resultado;
          if (this.length < 1) {
            this.mensajeInformacion = 'No hay eventos que cumplan con los criterios seleccionados';
          }
        });
        this.api.getBolidos(0, this.pageSize, this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin);
        this.api
          .getVideosUpdateListener()
          .subscribe((resultado: {videos: TarjetaVideo[], cuenta: number }) => {
            this.isLoading = false;
            this.cards = resultado.videos;
            this.ids.push(this.cards[0].id);
          });
        this.api.getRatio().subscribe((resultado: Ratio) => {
          this.ratioAprobacion = resultado.ratio;
          this.votosAprobacion = resultado.votos;
        });
      },
      error => {
        console.log('Error en la respuesta');
        this.conectado = false;
        this.isLoading = false;
        this.mensajeInformacion = 'No hay conexión en este momento, inténtelo de nuevo más tarde';
      });
    this.auth.getAuthStatusListener().subscribe(resultado => {
      if ( resultado) {
        this.logado = true;
      } else {
        this.logado = false;
        console.log('deslogado');
      }
    });
    this.logado = this.auth.getIsAuth();
    this.isHandset$.subscribe(resultado => {
      if (resultado) {
        this.esMovil = true;
      } else {
        this.esMovil = false;
      }
    });
  }
  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, public snackBar: MatSnackBar, private route: ActivatedRoute, location: Location, router: Router, private api: ApiService, private auth: AuthService) {
    router.events.subscribe(ruta => {
      if (location.isCurrentPathEqualTo('/videos', '')) { this.nombreMenu = 'Videos por votar';
      } else { if (location.isCurrentPathEqualTo('/detectados', '')) {
        this.nombreMenu = 'Bolidos detectados';
      } else { if (location.isCurrentPathEqualTo('', '')) {
        this.nombreMenu = 'Videos por votar';
      } else {
        this.nombreMenu = location.path();
      }}}
    });
    this.lastId = 0;
    this.getScreenSize();
  }
  eliminar(id) {
    const snackBarReg = this.snackBar.open('Se ha eliminado el evento:' + id, 'OK', {
      duration: 3000
    });
    this.api.deleteBolido(id).subscribe(respuesta => {
      console.log(respuesta);
      window.location.reload();
    });
  }
  esCamara(idCamara) {
    return this.camara1.find(elemento => elemento.value = idCamara).valorVista;
  }
  cambiarPagina(pagina: PageEvent) {
    console.log('Pulsado cambiar de pagina');
    let ultimoId = 0;
    if (this.pageSize !== pagina.pageSize) {
      ultimoId = 0;
      this.pageSize = pagina.pageSize;
    } else {
      ultimoId = this.cards[this.cards.length - 1].id;
      if ( pagina.pageIndex < pagina.previousPageIndex) {
        this.ids.pop();
        ultimoId = this.ids.pop() - 1;
      }
      this.pageSize = pagina.pageSize;
    }
    this.api.getBolidos(ultimoId, this.pageSize, this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin);
  }
  cambiadoCamara(camara: MatSelectChange) {
    console.log('Hemos cambiado la camara' + camara.value);
    this.camara = camara.value;
    this.api.getTotal(this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin).subscribe(resultado => {
      console.log('Resultado de GetTotal:');
      console.log(resultado);
      this.length = resultado;
      if ( this.length > 0) {
        this.api.getBolidos(0, this.pageSize, this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin);
      }
    });
  }
  cambiadoRatio(ratio: MatSelectChange) {
    console.log('Hemos cambiado la ratio' + ratio.value);
    this.ratio = ratio.value;
    this.api.getTotal(this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin).subscribe(resultado => {
      this.length = resultado;
      if ( this.length > 0) {
        this.api.getBolidos(0, this.pageSize, this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin);
      }
    });
  }
  actualizarRatio(ratio: number, votos: number) {
    this.api.actualizarRatio(ratio, votos);
    const snackBarReg = this.snackBar.open('Se ha actualizado el umbral', 'OK', {
      duration: 3000
    });
    this.ratioAprobacion = ratio;
    this.votosAprobacion = votos;
  }
  cambiarFechaInicio(fecha) {
    const local = new Date(fecha);
    console.log('Cambiado fecha:' + local.getFullYear() + '-' + ( local.getMonth() + 1) + '-' + local.getDate());
    this.fechaIni = ''  + local.getFullYear() + '-' + ( local.getMonth() + 1) + '-' + local.getDate();
    this.api.getTotal(this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin).subscribe(resultado => {
      this.length = resultado;
      if ( this.length > 0) {
        this.api.getBolidos(0, this.pageSize, this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin);
      }
    });
  }
  cambiarFechaFin(fecha) {
    const local = new Date(fecha);
    console.log('Cambiado fecha:' + local.getFullYear() + '-' + ( local.getMonth() + 1) + '-' + local.getDate());
    this.fechaFin = ''  + local.getFullYear() + '-' + ( local.getMonth() + 1) + '-' + local.getDate();
    this.api.getTotal(this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin).subscribe(resultado => {
      this.length = resultado;
      if ( this.length > 0) {
        this.api.getBolidos(0, this.pageSize, this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin);
      }
    });
  }
  cambiadoHoraIni(valor) {
    console.log('Nueva hora:' + valor);
    this.horaIni = valor;
    this.api.getTotal(this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin).subscribe(resultado => {
      this.length = resultado;
      if ( this.length > 0) {
        this.api.getBolidos(0, this.pageSize, this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin);
      }
    });
  }
  cambiadoHoraFin(valor) {
    console.log('Nueva hora:' + valor);
    this.horaFin = valor;
    this.api.getTotal(this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin).subscribe(resultado => {
      this.length = resultado;
      if ( this.length > 0) {
        this.api.getBolidos(0, this.pageSize, this.camara, this.fechaIni, this.fechaFin, this.ratio, this.horaIni, this.horaFin);
      }
    });
  }
}
