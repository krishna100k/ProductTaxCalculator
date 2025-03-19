import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointsService } from './endpoints.service';
import { environment } from '../../environments/environment';
import { State } from '../Models/stateModel';
import { TaxRateByLocationModel } from '../Models/TaxRateByLocationModel';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  environment = environment
  apiBaseUrl = environment.apiBaseUrl

  constructor(private http : HttpClient, private endpoints : EndpointsService) { }

  getStates() : Observable<State[]>{
    return this.http.get<State[]>(`${environment.apiBaseUrl}/${this.endpoints.getStates}`)
  }

  getTaxRatesByLocation(zipCode : string) : Observable<TaxRateByLocationModel>{
    return this.http.get<TaxRateByLocationModel>(`${environment.apiBaseUrl}/${this.endpoints.getTaxRatesByLocation(zipCode)}`)
  }
}
