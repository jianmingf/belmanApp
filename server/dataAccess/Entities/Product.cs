using System;
using System.Collections.Generic;

namespace dataAccess.Entities;

public partial class Product
{
    public string Id { get; set; } = null!;

    public string Reference { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string CategoryId { get; set; } = null!;

    public string Size { get; set; } = null!;

    public string Material { get; set; } = null!;

    public string Pressure { get; set; } = null!;

    public string Temperature { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Zone { get; set; } = null!;

    public string Shelf { get; set; } = null!;

    public string Bin { get; set; } = null!;

    public int StockQuantity { get; set; }

    public int MaxStock { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<DispatchRequest> DispatchRequests { get; set; } = new List<DispatchRequest>();

    public virtual ICollection<InventoryAlert> InventoryAlerts { get; set; } = new List<InventoryAlert>();
}
