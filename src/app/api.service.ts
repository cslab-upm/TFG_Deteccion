import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs';
import {Filtro} from './menu/detectados/detectados.component';

const localUrl = 'assets/data/video.json';
interface Id {
  identificador: number;
}
interface ObjetoVideo {
  id_video: number;
  camara: number;
  fecha: string;
  hora: string;
  ubicacion: string;
  aprobado: number;
  favor: number;
  contra: number;
}
interface RespuestaApi {
  id_video: number;
  ubicacion: string;
  contra: number;
  favor: number;
}
interface TarjetaVideo {
  title: string;
  camara: string;
  fecha: string;
  contra: number;
  favor: number;
  id: number;
  ubicacion: string;
  cols: number;
  rows: number;
}
interface estado {
  status: boolean;
}
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private videos: TarjetaVideo[] = [];
  private videossUpdated = new Subject<{ videos: TarjetaVideo[], cuenta: number}>();
  private conexionUpdated = new Subject<{status: boolean}>();
  private conexion: estado[] = [];
  constructor(private http: HttpClient) { }
  camara1: Filtro[] = [
    {value: '43' , valorVista: 'UPM Madrid'},
    {value: '40' , valorVista: 'Sor Paris'},
    {value: '35' , valorVista: 'IK Londres'}
  ];
  // Parte votar
  getVideoForVoting(): Promise<RespuestaApi> {
    let identificador;
    let video: RespuestaApi;
    console.log('Get Video for Voting');
    return new Promise(((resolve, reject) => {
      this.getRandomVideo().subscribe(id => {
        identificador = id;
        this.getVideo(identificador).subscribe(res => {
          video = {
            id_video: res.Video[0].id_video,
            ubicacion: res.Video[0].ubicacion,
            favor: res.Video[0].favor,
            contra: res.Video[0].contra
          };
          console.log(video);
          resolve(video);
        });
      });
    }));
  }
  getRandomVideo() {
    return this.http.get<{
      id: number;
    }>('http://' + environment.urlApi + '/api/getRandomVideo');
  }
  getVideo(id: number) {
    return this.http.get<{
      Video: Array<ObjetoVideo>;
    }>('http://' + environment.urlApi + '/api/videos/' + id);
  }
  votoPositivoVideo(id: number) {
    return this.http.get<{
      respuesta: string;
    }>('http://' + environment.urlApi + '/api/videos/votoPositivo/' + id);
  }
  saltar(id: number) {
    return this.http.get<{
      respuesta: string;
    }>('http://' + environment.urlApi + '/api/videos/saltar/' + id);
  }
  votoNegativoVideo(id: number, opcion: string) {
    return this.http.get<{
      respuesta: string;
    }>('http://' + environment.urlApi + '/api/videos/votoNegativo/' + id + '?' + opcion + '=1');
  }
  deleteBolido(lastid: number) {
    return this.http.delete<{
      respuesta: string;
    }>('http://' + environment.urlApi + '/api/bolidos/' + lastid);
  }
  // Parte bolidos
  getBolidos(lastid: number, numElems: number, camara, fechaIni, fechaFin, ratio, horaIni, horaFin) {
    console.log('Getting approved videos' +  new Date());
    console.log('Pidiendo ' + numElems + ' elementos desde lastId:' + lastid);
    let url = 'http://' + environment.urlApi + '/api/bolidos/' + lastid + '?pageSize=' + numElems;
    if ( typeof camara !== 'undefined' && camara) {
      url = url + '&camara=' + camara;
    }
    if ( typeof fechaIni !== 'undefined' && fechaIni !== 'false') {
      url = url + '&fechaIni=' + fechaIni;
    }
    if ( typeof fechaFin !== 'undefined' && fechaFin !== 'false') {
      url = url + '&fechaFin=' + fechaFin;
    }
    if ( typeof ratio !== 'undefined' && ratio) {
      url = url + '&ratio=' + (ratio * 100);
    }
    if ( typeof horaIni !== 'undefined' && horaIni) {
      url =  url + '&horaIni=' + horaIni;
    }
    if ( typeof horaFin !== 'undefined' && horaFin) {
      url = url + '&horaFin=' + horaFin;
    }
    this.http
      .get<{Bolidos: any}>(
        url)
      .pipe(
        map(videos => {
          return {
           videos: videos.Bolidos.map(video => {
                const camaraTexto = this.camara1.find(individuo => individuo.value == video.camara).valorVista;
                return {
                   title: 'Evento ' + video.id_video,
                   camara: camaraTexto,
                   fecha: video.fecha,
                   hora: video.hora,
                   contra: video.contra,
                   favor: video.favor,
                   id: video.id_video,
                   ubicacion: 'http://' + environment.urlApi + '/api/media/eventos/' + video.ubicacion + '/evento.mp4',
                   cols: 1,
                   rows: 1
                };
           }),
            cuenta: 1
          };
        })
      )
      .subscribe(datosTransformados => {
        this.videos = datosTransformados.videos;
        this.videossUpdated.next({
          videos: [...this.videos],
          cuenta: datosTransformados.cuenta
        });
      });

  }
  getVideosUpdateListener() {
    return this.videossUpdated.asObservable();
  }
  checkConnectionListener() {
    return this.conexionUpdated.asObservable();
  }
  checkConexion() {
    const url = 'http://' + environment.urlApi + '/api/testLive';
    return this.http.get(url);
  }
  getTotal(camara, fechaIni, fechaFin, ratio, horaIni, horaFin) {
    let url = 'http://' + environment.urlApi + '/api/bolidos/getTotal?comodin=comodin';
    if ( typeof camara !== 'undefined' && camara) {
      url = url + '&camara=' + camara;
    }
    if ( typeof fechaIni !== 'undefined' && fechaIni !== 'false') {
      url = url + '&fechaIni=' + fechaIni;
    }
    if ( typeof fechaFin !== 'undefined' && fechaFin !== 'false') {
      url = url + '&fechaFin=' + fechaFin;
    }
    if ( typeof ratio !== 'undefined' && ratio) {
      url = url + '&ratio=' + (ratio * 100);
    }
    if ( typeof horaIni !== 'undefined' && horaIni) {
      url =  url + '&horaIni=' + horaIni;
    }
    if ( typeof horaFin !== 'undefined' && horaFin) {
      url = url + '&horaFin=' + horaFin;
    }
    console.log(url);
    return this.http.get<number>(
      url);
  }
  actualizarRatio(ratio, votos) {
    let url = 'http://' + environment.urlApi + '/api/bolidos/setRatio?';
    url = url + 'ratio=' + ratio + '&votos=' + votos;
    console.log(url);
    return this.http.get(url);
  }
  getRatio() {
    const url = 'http://' + environment.urlApi + '/api/bolidos/getRatio';
    return this.http.get(url);
  }
}
