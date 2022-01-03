import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";
import { Lista } from "../Modelos/lista.model";
import { map } from 'rxjs/operators';

@Injectable()
export class FirestoreService{
    listasColeccion: AngularFirestoreCollection<Lista>;
    listas: Observable<Lista[]>;

    constructor(private afs: AngularFirestore){
        this.listasColeccion = afs.collection('usuarios').doc('ferchofpz@hotmail.com').collection('listas', ref => ref.orderBy('id', 'asc'));
    }

    getListas(): Observable<Lista[]>{

        this.listas = this.listasColeccion.snapshotChanges().pipe(
            map( cambios => {
                return cambios.map( accion => {
                    const datos = accion.payload.doc.data() as Lista;
                    return datos;
                })
            })
        );

        return this.listas;
    }

    addLista(lista: Lista){
        this.listasColeccion.doc(lista.id).set(lista);
    }

    editLista(lista: Lista){
        this.listasColeccion.doc(lista.id).update(lista);
    }

    deleteLista(id: string){
        this.listasColeccion.doc(id).delete();
        // TO DO: Eliminar la subcolección items en server-side
    }
}