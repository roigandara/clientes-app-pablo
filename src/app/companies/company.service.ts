import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private urlEndpoint : string = 'http://localhost:8082/api/enterprises';


  constructor(private http:HttpClient) { }

  getCompanies() : Observable<Company[]> {

    return this.http.get<Company[]>(this.urlEndpoint);
  }

}
