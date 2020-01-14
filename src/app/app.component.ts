import { Component } from '@angular/core';
import { ActualizarAppService } from './actualizar-app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tfgv02';
  constructor(private update: ActualizarAppService) {}
}
