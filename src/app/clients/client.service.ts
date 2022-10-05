import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Client } from './client';
import {catchError} from 'rxjs/operators';
import { Conditional } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService { // donde se escriben los métodos del servicio
  private urlEndpoint: string = 'http://localhost:8082/api/clients';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'}); 
  constructor(private http:HttpClient, private router : Router) { }

  getClients():Observable<Client[]> {
  // Los dos puntos indican lo que va a devolver un método (un array de clientes Client en este caso).
  // Observable se pone para que se puedan hacer las peticiones al servidor de manera paralela de manera que si una falla el resto puedan continuar.
    return this.http.get<Client[]>(this.urlEndpoint); // hay que castear urlEndPoint a un array de clientes Client[] porque es lo que devuelve el método
  }

  create(client:Client):Observable<any>{
    return this.http.post(this.urlEndpoint, client,{headers:this.httpHeaders})
    .pipe(
      catchError(
        e => { 
          // if(e.status == 400) {
          //   return throwError(()=>e); 
          // }
          // ^ esto es por si se quieren hacer errores personalizados basados en el código
          return throwError(()=>e);
        }
      )
    )
    //se devuelve el post con la url, el cliente y el header
    //pipe
  }

  getClient(id:number) : Observable<Client> {
    return this.http.get<Client>(`${this.urlEndpoint}/${id}`)
    .pipe(
      catchError(e => { // si esto va mal...
        this.router.navigate(['/clients']); // mándame a /clients
        console.error(e.error.errors);
        return throwError(() => e);
      }
        )
    )
  }

  updateClient(client: Client) : Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${client.id}`, client, {headers: this.httpHeaders})
    // como nos pasan un client por parámetro, para averiguar su id tenemos que mirar el atributo del objeto. client.id
    // está formateado como una petición de postman: URL, body (el contenido de cliente) y el header (que indica que la estructura es JSON)
    // fijarse que está declarado aquí mismo en esta clase: private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'}); 
    
    .pipe(
      catchError(e => { // si esto va mal...
        return throwError(() => e);
      }
        )
    )

  }
  
}
