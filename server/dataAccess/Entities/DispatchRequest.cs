using System;
using System.Collections.Generic;

namespace dataAccess.Entities;

public partial class DispatchRequest
{
    public string Id { get; set; } = null!;

    public string ProductId { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string RequestedBy { get; set; } = null!;

    public string Workshop { get; set; } = null!;

    public DateTime RequestedAt { get; set; }

    public DateTime? CompletedAt { get; set; }

    public virtual Product Product { get; set; } = null!;
}
