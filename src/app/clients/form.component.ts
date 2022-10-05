import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoundOffsets } from '@popperjs/core/lib/modifiers/computeStyles';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  client: Client = new Client();
  title:string = 'Formulario del cliente';
  errors:string[];

  constructor(private clientService:ClientService, private router:Router, private activeRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.getClient(); // CARGA LOS DATOS DE LOS CLIENTES EN UN FORMULARIO SI LA ID DEL USER SE INCLUYE
  }


  public create():void{
    this.clientService.create(this.client).subscribe(
      response => {
        this.router.navigate(['/clients'])
        swal.fire("Nuevo cliente", `${response.message}: ${response.cliente.name}`, 'success') // las comillas francesas `` concatenan
        // en response.cliente.name hay que poner "cliente" porque en el método create del backend en ClientRestController la línea 70 tiene "response.put("cliente", cNull);"
      },
      err => { // si da error...
        this.errors= err.error.errors as string[];
        console.error(err.status);
        console.error(this.errors);
      }
    );
    // el this.client es el de la línea ¿12? del formulario
    // MIRAR FLUJO DEL PROYECTO
    // con el subscribe

  }

  public getClient() : void {
    this.activeRouter.params.subscribe(params => { // pilla toda la URL
      let id = params['id']; // selecciona la id
      if(id) {
        this.clientService.getClient(id).subscribe(client => {this.client = client}) // pilla cliente según su id
      }

     }
    )
  }

  public updateClient() : void {
    this.clientService.updateClient(this.client).subscribe(
      response => {  
        this.router.navigate(['/clients']);
        swal.fire('Cliente actualizado', `${response.message}: ${response.Cliente.name}`, 'success');
      },

      err => {  
      this.errors = err.error.errors as string[];
      console.error(err.status);
      console.error(this.errors);
    }
    )
  }

}
