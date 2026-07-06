using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/warehouse")]
public class WarehouseController : ControllerBase
{
    private readonly IWarehouseService _warehouseService;

    public WarehouseController(IWarehouseService warehouseService)
    {
        _warehouseService = warehouseService;
    }

    [HttpGet]
    public async Task<ActionResult<List<WarehouseItemDto>>> GetWarehouseItems(
        [FromQuery] string? search)
    {
        var items = await _warehouseService.GetWarehouseItemsAsync(search);
        return Ok(items);
    }

    [HttpPost("{productId}/pick")]
    public async Task<ActionResult<PickResultDto>> PickProduct(
        string productId,
        [FromBody] PickRequestDto request)
    {
        var result = await _warehouseService.PickProductAsync(productId, request);

        if (!result.Success)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }
}