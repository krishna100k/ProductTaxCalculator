﻿using Newtonsoft.Json;

namespace ProductTaxCalculator.Models.Tax
{
    public class TaxRateByLocationModel
    {
        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("city_rate")]
        public decimal CityRate { get; set; }

        [JsonProperty("combined_district_rate")]
        public decimal CombinedDistrictRate { get; set; }

        [JsonProperty("combined_rate")]
        public decimal CombinedRate { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("country_rate")]
        public decimal CountryRate { get; set; }

        [JsonProperty("county")]
        public string County { get; set; }

        [JsonProperty("county_rate")]
        public decimal CountyRate { get; set; }

        [JsonProperty("freight_taxable")]
        public bool FreightTaxable { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("state_rate")]
        public decimal StateRate { get; set; }

        [JsonProperty("zip")]
        public string Zip { get; set; }
    }
}
