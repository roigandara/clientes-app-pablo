import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  clients: Client[];

  constructor(private clientService:ClientService) { // inyectamos clientService en el constructor para poder llamarlo luego

  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe( // cuando se llama a un método del servicio, para que te devuelva algo tienes que utilizar 'subscribe'.
      clients => this.clients = clients // te va a devolver 'this.clients', de modo que queremos que lo iguale a la variable tipo array de esta clase 'clients'. El 'clients =>' es como una variable intermedia.
    )
  }

}
