export interface TaxRateByLocationModel {
  city: string;
  cityRate: number;
  combinedDistrictRate: number;
  combinedRate: number;
  country: string;
  countryRate: number;
  county: string;
  countyRate: number;
  freightTaxable: boolean;
  state: string;
  stateRate: number;
  zip: string;
}
