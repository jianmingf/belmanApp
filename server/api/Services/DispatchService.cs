using api.Dtos;
using dataAccess;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class DispatchService : IDispatchService
{
    private readonly BelmanDbContext _context;

    public DispatchService(BelmanDbContext context)
    {
        _context = context;
    }

    public async Task<List<DispatchDto>> GetDispatchesAsync()
    {
        return await _context.DispatchRequests
            .Include(d => d.Product)
            .OrderByDescending(d => d.RequestedAt)
            .Select(d => new DispatchDto
            {
                Id = d.Id,
                ProductId = d.ProductId,
                ProductReference = d.Product.Reference,
                ProductName = d.Product.Name,
                Status = d.Status,
                RequestedBy = d.RequestedBy,
                Workshop = d.Workshop,
                RequestedAt = d.RequestedAt,
                CompletedAt = d.CompletedAt
            })
            .ToListAsync();
    }

    public async Task<bool> MarkReadyAsync(string id)
    {
        var dispatch = await _context.DispatchRequests
            .FirstOrDefaultAsync(d => d.Id == id);

        if (dispatch is null)
        {
            return false;
        }

        dispatch.Status = "Completed";
        dispatch.CompletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }
}