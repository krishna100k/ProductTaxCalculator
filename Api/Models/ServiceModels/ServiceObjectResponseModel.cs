namespace ProductTaxCalculator.Models.ServiceModels
{
    public class ServiceObjectResponseModel<T>
    {
        public string? Message { get; set; }
        public string? Error { get; set; }
        public T? TaxRates { get; set; }
    }
}
