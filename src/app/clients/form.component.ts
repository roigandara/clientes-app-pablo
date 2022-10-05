import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: []
})
export class FormComponent implements OnInit {

  client : Client = new Client();
  title : string = 'Formulario de cliente';
  errors : string[];

  constructor(private clientService:ClientService, private router : Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getClient();
  }

  public create() : void {
    this.clientService.create(this.client).subscribe(
      response => {  
        this.router.navigate(['/clients']);
        swal.fire('Nuevo cliente', `${response.message}: ${response.Cliente.name}`, 'success'); // `Plantilla`
      
      },
      err => {  
      this.errors = err.error.errors as string[];
      console.error(err.status);
      console.error(this.errors);
    } 
    )

  }

  public getClient() : void {
    this.activeRoute.params.subscribe(params => { //Pilla toda la URL
      let id = params['id'];  // Selecciona la id
      if(id) {
        this.clientService.getClient(id).subscribe(client => this.client = client )  //Pilla el cliente según su id
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
