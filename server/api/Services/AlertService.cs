using api.Dtos;
using dataAccess;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class AlertService : IAlertService
{
    private readonly BelmanDbContext _context;

    public AlertService(BelmanDbContext context)
    {
        _context = context;
    }

    public async Task<List<AlertDto>> GetAlertsAsync(bool unresolvedOnly)
    {
        var query = _context.InventoryAlerts
            .Include(a => a.Product)
            .AsQueryable();

        if (unresolvedOnly)
        {
            query = query.Where(a => !a.IsResolved);
        }

        return await query
            .OrderBy(a => a.IsResolved)
            .ThenByDescending(a => a.CreatedAt)
            .Select(a => new AlertDto
            {
                Id = a.Id,
                ProductId = a.ProductId,
                ProductReference = a.Product.Reference,
                ProductName = a.Product.Name,
                AlertType = a.AlertType,
                Severity = a.Severity,
                Message = a.Message,
                StockQuantity = a.StockQuantity,
                MaxStock = a.MaxStock,
                StockPercentage = a.StockPercentage,
                IsResolved = a.IsResolved,
                CreatedAt = a.CreatedAt,
                ResolvedAt = a.ResolvedAt
            })
            .ToListAsync();
    }

    public async Task<bool> ResolveAlertAsync(string id)
    {
        var alert = await _context.InventoryAlerts
            .FirstOrDefaultAsync(a => a.Id == id);

        if (alert is null)
        {
            return false;
        }

        alert.IsResolved = true;
        alert.ResolvedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }
}