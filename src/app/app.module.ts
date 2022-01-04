import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FirestoreService } from './Servicios/firestore.service';
import { environment } from '../environments/environment';

// Firestore
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { ItemsComponent } from './componentes/items/items.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    PiePaginaComponent,
    InicioComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'mis-listas'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    FormsModule
  ],
  providers: [
    FirestoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
