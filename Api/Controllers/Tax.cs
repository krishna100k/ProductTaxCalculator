using Microsoft.AspNetCore.Mvc;
using ProductTaxCalculator.Models.ServiceModels;
using ProductTaxCalculator.Models.Tax;
using ProductTaxCalculator.Services;

namespace ProductTaxCalculator.Controllers
{
    [ApiController]
    [Route("api/Tax")]
    public class Tax : ControllerBase
    {
        private TaxService _taxService;
        public Tax(TaxService taxService)
        {
            _taxService = taxService;
        }

        [HttpGet("GetTaxRatesByLocation")]
        public async Task<IActionResult> GetTaxRatesByLocation([FromQuery] string zipCode)
        {
            try
            {
               ServiceObjectResponseModel<TaxRateByLocationModel> taxResponse = await _taxService.GetTaxRatesByLocation(zipCode);

               if(taxResponse.TaxRates == null || taxResponse.Error != null)
               {
                    return BadRequest(new { Message = taxResponse.Error, StatusCode = 404 });
               }

                TaxRateByLocationModel? taxRates = taxResponse.TaxRates;

                return Ok(taxRates);


            }
            catch (Exception ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}
