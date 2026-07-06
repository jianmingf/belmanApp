using api.Dtos;
using dataAccess;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class StatsService : IStatsService
{
    private readonly BelmanDbContext _context;

    public StatsService(BelmanDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardStatsDto> GetStatsAsync()
    {
        var totalItems = await _context.Products.CountAsync();

        var pendingRequests = await _context.DispatchRequests
            .CountAsync(d => d.Status == "Pending" || d.Status == "In Progress");

        var activeAlerts = await _context.InventoryAlerts
            .CountAsync(a => !a.IsResolved);

        return new DashboardStatsDto
        {
            DbSync = "LIVE",
            TotalItems = totalItems,
            PendingRequests = pendingRequests,
            ActiveAlerts = activeAlerts,
            Workshop = "W-08B"
        };
    }
}