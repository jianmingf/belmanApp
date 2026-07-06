using api.Dtos;

namespace api.Services;

public interface IWarehouseService
{
    Task<List<WarehouseItemDto>> GetWarehouseItemsAsync(string? search);
    Task<PickResultDto> PickProductAsync(string productId, PickRequestDto request);
}