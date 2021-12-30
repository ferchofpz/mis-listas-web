import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Lista } from 'src/app/Modelos/lista.model';
import { FirestoreService } from 'src/app/Servicios/firestore.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  listas: Lista[];

  lista: Lista = {
    nombre: '',
    descripcion: '',
    usuario: "ferchofpz@hotmail.com"
  };

  @ViewChild("listaForm") listaForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(
    private firestoreService: FirestoreService,
    private flashMessages: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.firestoreService.getListas().subscribe(
      listas => this.listas = listas
    );
  }

  agregarLista({value, valid}: {value:Lista, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Los datos ingresados no son válidos',{cssClass: 'alert-danger', timeout: 4000});
    }
    else{
      this.firestoreService.addLista(value);
      this.botonCerrar.nativeElement.click();
    }
    this.listaForm.resetForm();
  }

}
