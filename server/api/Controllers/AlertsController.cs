using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/alerts")]
public class AlertsController : ControllerBase
{
    private readonly IAlertService _alertService;

    public AlertsController(IAlertService alertService)
    {
        _alertService = alertService;
    }

    [HttpGet]
    public async Task<ActionResult<List<AlertDto>>> GetAlerts(
        [FromQuery] bool unresolvedOnly = true)
    {
        var alerts = await _alertService.GetAlertsAsync(unresolvedOnly);
        return Ok(alerts);
    }

    [HttpPatch("{id}/resolve")]
    public async Task<IActionResult> ResolveAlert(string id)
    {
        var success = await _alertService.ResolveAlertAsync(id);

        if (!success)
        {
            return NotFound();
        }

        return NoContent();
    }
}