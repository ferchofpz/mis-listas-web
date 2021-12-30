import { Component, OnInit } from '@angular/core';
import { Lista } from 'src/app/Modelos/lista.model';
import { FirestoreService } from 'src/app/Servicios/firestore.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  listas: Lista[];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getListas().subscribe(
      listas => this.listas = listas
    );
  }

}
