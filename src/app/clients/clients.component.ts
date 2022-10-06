import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  
  clients: Client[];
  constructor(private clientService:ClientService) { }

  deleteClient(client:Client): void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar al cliente ${client.name} ${client.surname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client.id).subscribe(
          response=>{
            this.clients = this.clients.filter(cli=> cli !== client)
            Swal.fire(
              'Cliente eliminado!',
              `${client.name} ${client.surname}`,
              'success'
            )
          }
        )
      }
    })
  }


  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => this.clients = clients // Nos devuelve el array de clientes que lo metemos en el array de clientes del front
    )
  }

}
