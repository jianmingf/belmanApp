using System;
using System.Collections.Generic;

namespace dataAccess.Entities;

public partial class InventoryAlert
{
    public string Id { get; set; } = null!;

    public string ProductId { get; set; } = null!;

    public string AlertType { get; set; } = null!;

    public string Severity { get; set; } = null!;

    public string Message { get; set; } = null!;

    public int StockQuantity { get; set; }

    public int MaxStock { get; set; }

    public decimal StockPercentage { get; set; }

    public bool IsResolved { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? ResolvedAt { get; set; }

    public virtual Product Product { get; set; } = null!;
}
