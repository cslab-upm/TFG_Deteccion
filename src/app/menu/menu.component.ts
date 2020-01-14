import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav, MatSidenavContainer} from '@angular/material';
import {AuthComponent} from './auth/auth.component';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  estaAutenticado = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.getAuthStatusListener().subscribe(resultado => {
      this.estaAutenticado = true;
    });
  }
  logout() {
    this.auth.logout();
    this.estaAutenticado = false;
  }
  funcionCambiar(drawer) {
    if (window.innerWidth < 600) {
      drawer.toggle();
    }
  }
}
