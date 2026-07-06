namespace api.Dtos;

public class WarehouseItemDto
{
    public string Id { get; set; } = string.Empty;
    public string Reference { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CategoryName { get; set; } = string.Empty;

    public string Size { get; set; } = string.Empty;
    public string Pressure { get; set; } = string.Empty;

    public string Zone { get; set; } = string.Empty;
    public string Shelf { get; set; } = string.Empty;
    public string Bin { get; set; } = string.Empty;

    public int StockQuantity { get; set; }
    public int MaxStock { get; set; }
    public decimal StockPercentage { get; set; }
    public bool IsLowInventory { get; set; }
}