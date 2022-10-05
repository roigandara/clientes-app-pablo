import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from './client';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndpoint : string = 'http://localhost:8082/api/clients';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'}); //httpHeaders indica que el formato a leer es json

  constructor(private http:HttpClient, private router: Router) { }

  getClients() : Observable<Client[]> {
    return this.http.get<Client[]>(this.urlEndpoint);
  }

  create(client : Client) : Observable<any>{
    return this.http.post(this.urlEndpoint, client, {headers: this.httpHeaders}).pipe(
      catchError(e => { return throwError(() => e)  } )
      )
  }

  getClient(id:number) : Observable<Client> {
    return this.http.get<Client>(`${this.urlEndpoint}/${id}` )
    .pipe(catchError(e => { 
      this.router.navigate(['/clients']);
      console.error(e.error.errors);
      return throwError(() => e);  })
    )
  }

  updateClient(client : Client) : Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${client.id}`, client, {headers: this.httpHeaders} )  
    .pipe( catchError(  e => { return throwError(() => e)  }  ))  

  }

  

}
