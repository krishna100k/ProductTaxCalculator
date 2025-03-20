import { Component, OnInit } from '@angular/core';
import { State } from '../../Models/stateModel';
import { TaxRateByLocationModel } from '../../Models/TaxRateByLocationModel';
import { TaxService } from '../../Services/tax.service';

@Component({
  selector: 'app-tax-calculator',
  standalone: false,
  templateUrl: './tax-calculator.component.html',
  styleUrl: './tax-calculator.component.css'
})
export class TaxCalculatorComponent implements OnInit{
  loading : boolean = false
  states : State[] = [];
  selectedState = "Select State";
  zipCode = "";
  taxRateResponse !: TaxRateByLocationModel | undefined
  selectedTax : string = "Select Tax"
  selectedTaxRate : any
  totalTaxCalculatedAmount = "0"
  taxAmount  = "0"
  productName !: string
  productCost = "0"
  taxRatesList = [
    {
      name: "City Rate",
      jsonKey: "cityRate"
    },
    {
      name: "Combined District Rate",
      jsonKey: "combinedDistrictRate"
    },
    {
      name: "Combined Rate",
      jsonKey: "combinedRate"
    },
    {
      name: "Country Rate",
      jsonKey: "countryRate"
    },
    {
      name: "County Rate",
      jsonKey: "countyRate"
    },
    {
      name: "State Rate",
      jsonKey: "stateRate"
    }
  ];
  

  constructor(private taxService : TaxService,){
  }

  ngOnInit(){
    this.taxService.getStates().subscribe({
      next : (res) => {
        this.states = res
      },
       error : (err) => {
        console.log(err)
       }
    });
  }

  selectState(e : Event){
    let event = e.target as HTMLSelectElement;
    this.selectedState = event.value;
  }

  selectTax(e : Event){
    let event = e.target as HTMLSelectElement;
    this.selectedTax = event.value;
    this.selectTaxRate(this.selectedTax);
  }

  selectTaxRate(selectedTax : string){
    let selectedTaxObject = this.taxRatesList.find(t => t.name === selectedTax);
    if(selectedTaxObject){
      this.selectedTaxRate = (this.taxRateResponse as any)[selectedTaxObject?.jsonKey];
    }
  }

  getTaxes(){
    if(this.zipCode.trim() === "") return alert ("Zip Code is Required !!!");
    if(this.selectedState == "Select State" ) return alert ("State is Required !!!");
    this.loading = true
    this.taxService.getTaxRatesByLocation(this.zipCode.trim()).subscribe({
      next : (res) => {
        this.taxRateResponse = res
        this.productCost = "0";
        this.productName = "";
        this.totalTaxCalculatedAmount = "0";
        this.taxAmount = "0";
        this.selectedTaxRate = undefined;
        this.selectedTax = "City Rate";
        this.selectTaxRate(this.selectedTax);
        this.loading = false;
        let foundState : State | undefined = this.states.find(s => s.name == this.selectedState)
        if(foundState){
          if(this.taxRateResponse.state != foundState.code){
            this.reset();
            return alert("Zip code is not valid for the specified state.")
          } 
        }
      },
       error : (err) => {
        this.loading = false
        this.reset();
        if(err?.error.statusCode == 404){
          return alert("Zip code is not valid for the specified state.")
        }
       }
    })
  }

  calculateTax(){
    if (this.selectedTaxRate == undefined || this.selectedTaxRate == null) return alert("Please select tax.");
    if(this.productCost == null) return alert("Please enter product cost.");
    if(this.productCost.toString().startsWith("-")) return alert("Product cost cannot be negative.")
    let taxAmount = parseFloat(this.productCost) * parseFloat(this.selectedTaxRate);
    this.taxAmount = taxAmount.toFixed(2)
    let totalTaxCalculatedAmount = parseFloat(this.productCost) + parseFloat(this.taxAmount);
    this.totalTaxCalculatedAmount = totalTaxCalculatedAmount.toFixed(2);
  }

  reset(){
    this.productCost = "0";
    this.productName = "";
    this.taxAmount = "0";
    this.selectedState = "Select State";
    this.selectedTax = "Select Tax";
    this.selectedTaxRate = undefined;
    this.zipCode = "";
    this.totalTaxCalculatedAmount = "0";
    this.taxRateResponse = undefined ;
  }
}
