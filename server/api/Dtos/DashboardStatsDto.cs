namespace api.Dtos;

public class DashboardStatsDto
{
    public string DbSync { get; set; } = "LIVE";
    public int TotalItems { get; set; }
    public int PendingRequests { get; set; }
    public int ActiveAlerts { get; set; }
    public string Workshop { get; set; } = "W-08B";
}