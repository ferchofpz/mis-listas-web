import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
    id: '',
    nombre: '',
    descripcion: ''
  };

  @ViewChild("listaForm") listaForm: NgForm;
  @ViewChild("botonCerrarNew") botonCerrarNew: ElementRef;
  @ViewChild("botonCerrarEdit") botonCerrarEdit: ElementRef;

  @Input() indice: number = 0;

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
      value.id = (this.listas.length + 1).toString();
      this.firestoreService.addLista(value);
      this.botonCerrarNew.nativeElement.click();
    }
    this.listaForm.resetForm();
  }

  cargarDatos(){
    this.lista.nombre = this.listas[this.indice].nombre;
    this.lista.descripcion = this.listas[this.indice].descripcion;
    this.lista.id = this.listas[this.indice].id;
  }

  editarLista({value, valid}: {value:Lista, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Los datos ingresados no son válidos',{cssClass: 'alert-danger',timeout: 4000})
    }
    else{
      value.id = (this.indice + 1).toString();
      this.firestoreService.editLista(value);
      this.botonCerrarEdit.nativeElement.click();
    }
  }

  eliminarLista(i: number){
    this.firestoreService.deleteLista((i+1).toString());
  }
}
