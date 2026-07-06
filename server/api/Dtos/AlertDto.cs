namespace api.Dtos;

public class AlertDto
{
    public string Id { get; set; } = string.Empty;
    public string ProductId { get; set; } = string.Empty;
    public string ProductReference { get; set; } = string.Empty;
    public string ProductName { get; set; } = string.Empty;

    public string AlertType { get; set; } = string.Empty;
    public string Severity { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;

    public int StockQuantity { get; set; }
    public int MaxStock { get; set; }
    public decimal StockPercentage { get; set; }

    public bool IsResolved { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ResolvedAt { get; set; }
}