﻿using Microsoft.AspNetCore.Mvc;
using ProductTaxCalculator.Models.State;
using ProductTaxCalculator.Services;

namespace ProductTaxCalculator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class States : ControllerBase
    {
        private readonly StateService _stateService;
        public States(StateService stateService)
        {
            _stateService = stateService;
        }

        [HttpGet("GetStates")]
        public async Task<IActionResult> GetStates()
        {
            try
            {
                List<State> states = _stateService.GetStates();
                return Ok(states);
            }
            catch (Exception ex) {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
