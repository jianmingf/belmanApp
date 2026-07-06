namespace api.Dtos;

public class PickResultDto
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public WarehouseItemDto? Item { get; set; }
}