import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Items } from 'src/app/Modelos/items.model';
import { Lista } from 'src/app/Modelos/lista.model';
import { FirestoreService } from 'src/app/Servicios/firestore.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  listas: Lista[];
  items: Items = {items: []};
  idLista: string;
   
  lista: Lista = {
    id: '',
    nombre: '',
    descripcion: ''
  };

  @ViewChild("botonCerrarEdit") botonCerrarEdit: ElementRef;
  @ViewChild("botonCerrarConfirmar") botonCerrarConfirmar: ElementRef;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.idLista = this.route.snapshot.params['id'];
    
    this.firestoreService.getListas().subscribe(
      listas => this.listas = listas
    );

    this.firestoreService.getItems(this.idLista).subscribe(
      items => {
        if(items.length > 0)
          this.items = items[0];
      }
    );
  }

  editarLista({value, valid}: {value:Lista, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Los datos ingresados no son válidos',{cssClass: 'alert-danger',timeout: 4000})
    }
    else{
      value.id = this.idLista;
      this.firestoreService.editLista(value);
      this.botonCerrarEdit.nativeElement.click();
    }
  }

  eliminarLista(){
    this.firestoreService.deleteLista(this.idLista);
    this.botonCerrarConfirmar.nativeElement.click();
  }

  cargarDatos(){
    this.lista.id = this.listas[+this.idLista - 1].id;
    this.lista.nombre = this.listas[+this.idLista - 1].nombre;
    this.lista.descripcion = this.listas[+this.idLista - 1].descripcion;
  }
}
