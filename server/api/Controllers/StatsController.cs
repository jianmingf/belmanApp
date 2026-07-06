using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/stats")]
public class StatsController : ControllerBase
{
    private readonly IStatsService _statsService;

    public StatsController(IStatsService statsService)
    {
        _statsService = statsService;
    }

    [HttpGet]
    public async Task<ActionResult<DashboardStatsDto>> GetStats()
    {
        var stats = await _statsService.GetStatsAsync();
        return Ok(stats);
    }
}