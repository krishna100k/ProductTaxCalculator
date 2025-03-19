
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ProductTaxCalculator.Configurations;
using ProductTaxCalculator.Models.ServiceModels;
using ProductTaxCalculator.Models.Tax;
using RestSharp;
using System.Net;

namespace ProductTaxCalculator.Services
{
    public class TaxService
    {
        private readonly IConfiguration _config; 
        public TaxService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<ServiceObjectResponseModel<TaxRateByLocationModel>> GetTaxRatesByLocation(string zipCode)
        {
            try
            {
                string showTaxRatesForALocationEndpoint = String.Format(Endpoints.ShowTaxRatesForALocation, zipCode) ;
                RestClient client = new RestClient(Constants.TaxJarApiBaseUrl);
                RestRequest request = new RestRequest();
                request.Method = Method.Get;
                request.Resource = showTaxRatesForALocationEndpoint;
                request.AddHeader("Authorization", "Bearer " + _config["TaxJarApiKey:ApiKey"]);

                RestResponse apiResponse = await client.ExecuteAsync(request);
                if(apiResponse.StatusCode == HttpStatusCode.NotFound)
                {
                    return new ServiceObjectResponseModel<TaxRateByLocationModel>
                    {
                        Error = "Invalid Zip Code."
                    };
                }
                if (!apiResponse.IsSuccessStatusCode)
                {
                    return new ServiceObjectResponseModel<TaxRateByLocationModel>
                    {
                        Error = apiResponse.ErrorMessage
                    };
                }

                JObject? rate = JsonConvert.DeserializeObject<JObject>(apiResponse.Content.ToString());

                TaxRateByLocationModel? response = rate["rate"]?.ToObject<TaxRateByLocationModel>();

                if(response == null)
                {
                    return new ServiceObjectResponseModel<TaxRateByLocationModel>
                    {
                        Error = "Failed to deserialize response."
                    };
                }

                return new ServiceObjectResponseModel<TaxRateByLocationModel>
                {
                    TaxRates = response
                };


            }catch (Exception ex)
            {
                return new ServiceObjectResponseModel<TaxRateByLocationModel>
                {
                    Error = ex.Message,
                };
            }
        }
    }
}
