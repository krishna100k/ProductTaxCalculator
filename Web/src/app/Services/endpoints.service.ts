import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {
  getStates : string = "api/States/GetStates";
  getTaxRatesByLocation(zipCode: string): string {
    return `api/Tax/GetTaxRatesByLocation?zipCode=${zipCode}`;
  }
}
