using api.Dtos;
using dataAccess;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class WarehouseService : IWarehouseService
{
    private readonly BelmanDbContext _context;

    public WarehouseService(BelmanDbContext context)
    {
        _context = context;
    }

    public async Task<List<WarehouseItemDto>> GetWarehouseItemsAsync(string? search)
    {
        var query = _context.Products
            .Include(p => p.Category)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var value = search.Trim().ToLower();

            query = query.Where(p =>
                p.Reference.ToLower().Contains(value) ||
                p.Name.ToLower().Contains(value) ||
                p.Category.Name.ToLower().Contains(value) ||
                p.Zone.ToLower().Contains(value) ||
                p.Shelf.ToLower().Contains(value) ||
                p.Bin.ToLower().Contains(value)
            );
        }

        return await query
            .OrderBy(p => p.Zone)
            .ThenBy(p => p.Shelf)
            .ThenBy(p => p.Bin)
            .Select(p => new WarehouseItemDto
            {
                Id = p.Id,
                Reference = p.Reference,
                Name = p.Name,
                CategoryName = p.Category.Name,
                Size = p.Size,
                Pressure = p.Pressure,
                Zone = p.Zone,
                Shelf = p.Shelf,
                Bin = p.Bin,
                StockQuantity = p.StockQuantity,
                MaxStock = p.MaxStock,
                StockPercentage = Math.Round((decimal)p.StockQuantity / p.MaxStock * 100, 2),
                IsLowInventory = p.StockQuantity < p.MaxStock * 0.10m
            })
            .ToListAsync();
    }

    public async Task<PickResultDto> PickProductAsync(string productId, PickRequestDto request)
    {
        if (request.Quantity <= 0)
        {
            return new PickResultDto
            {
                Success = false,
                Message = "Quantity must be greater than 0."
            };
        }

        var product = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == productId);

        if (product is null)
        {
            return new PickResultDto
            {
                Success = false,
                Message = "Product not found."
            };
        }

        if (product.StockQuantity < request.Quantity)
        {
            return new PickResultDto
            {
                Success = false,
                Message = "Not enough stock available."
            };
        }

        product.StockQuantity -= request.Quantity;

        await _context.SaveChangesAsync();

        var item = new WarehouseItemDto
        {
            Id = product.Id,
            Reference = product.Reference,
            Name = product.Name,
            CategoryName = product.Category.Name,
            Size = product.Size,
            Pressure = product.Pressure,
            Zone = product.Zone,
            Shelf = product.Shelf,
            Bin = product.Bin,
            StockQuantity = product.StockQuantity,
            MaxStock = product.MaxStock,
            StockPercentage = Math.Round((decimal)product.StockQuantity / product.MaxStock * 100, 2),
            IsLowInventory = product.StockQuantity < product.MaxStock * 0.10m
        };

        return new PickResultDto
        {
            Success = true,
            Message = $"Picked {request.Quantity} item(s).",
            Item = item
        };
    }
}