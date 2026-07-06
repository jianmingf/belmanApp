using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/dispatches")]
public class DispatchesController : ControllerBase
{
    private readonly IDispatchService _dispatchService;

    public DispatchesController(IDispatchService dispatchService)
    {
        _dispatchService = dispatchService;
    }

    [HttpGet]
    public async Task<ActionResult<List<DispatchDto>>> GetDispatches()
    {
        var dispatches = await _dispatchService.GetDispatchesAsync();
        return Ok(dispatches);
    }

    [HttpPatch("{id}/mark-ready")]
    public async Task<IActionResult> MarkReady(string id)
    {
        var success = await _dispatchService.MarkReadyAsync(id);

        if (!success)
        {
            return NotFound();
        }

        return NoContent();
    }
}