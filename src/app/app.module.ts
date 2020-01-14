import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
// Importar elementos de material design
import { MatSliderModule } from '@angular/material/slider';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DetectadosComponent } from './menu/detectados/detectados.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import {
  MatChipsModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule, MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatDialogModule} from '@angular/material';
import { environment } from '../environments/environment';
import { VotarComponent } from './menu/votar/votar.component';
import { DialogoTutorialComponent } from './menu/votar/dialogo-tutorial/dialogo-tutorial.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DialogoRechazarComponent } from './menu/votar/dialogo-rechazar/dialogo-rechazar.component';
import { AuthComponent } from './menu/auth/auth.component';
import { LoginComponent } from './menu/auth/login/login.component';
import { SignupComponent } from './menu/auth/signup/signup.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DetectadosComponent,
    VotarComponent,
    DialogoTutorialComponent,
    DialogoRechazarComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
  ],
  entryComponents: [
    DialogoTutorialComponent,
    DialogoRechazarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTreeModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatRadioModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  providers: [CookieService,
        MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

