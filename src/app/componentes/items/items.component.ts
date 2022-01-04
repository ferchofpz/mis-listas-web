import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Items } from 'src/app/Modelos/items.model';
import { FirestoreService } from 'src/app/Servicios/firestore.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Items = {items: []};

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.firestoreService.getItems(this.route.snapshot.params['id']).subscribe(
      items => {
        if(items.length > 0)
          this.items = items[0];
      }
    );
  }

}
