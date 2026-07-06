namespace api.Dtos;

public class DispatchDto
{
    public string Id { get; set; } = string.Empty;
    public string ProductId { get; set; } = string.Empty;
    public string ProductReference { get; set; } = string.Empty;
    public string ProductName { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;
    public string RequestedBy { get; set; } = string.Empty;
    public string Workshop { get; set; } = string.Empty;

    public DateTime RequestedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}