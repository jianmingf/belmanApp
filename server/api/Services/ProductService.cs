using api.Dtos;
using dataAccess;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class ProductService : IProductService
{
    private readonly BelmanDbContext _context;

    public ProductService(BelmanDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProductDto>> GetProductsAsync(
        string? search,
        string? categoryId,
        string? category,
        string? size,
        string? material,
        string? pressure,
        bool inStockOnly)
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
                p.Size.ToLower().Contains(value) ||
                p.Material.ToLower().Contains(value) ||
                p.Pressure.ToLower().Contains(value) ||
                p.Category.Name.ToLower().Contains(value)
            );
        }

        if (!string.IsNullOrWhiteSpace(categoryId))
        {
            query = query.Where(p => p.CategoryId == categoryId);
        }

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(p => p.Category.Name.ToLower() == category.ToLower());
        }

        if (!string.IsNullOrWhiteSpace(size))
        {
            query = query.Where(p => p.Size.ToLower() == size.ToLower());
        }

        if (!string.IsNullOrWhiteSpace(material))
        {
            query = query.Where(p => p.Material.ToLower().Contains(material.ToLower()));
        }

        if (!string.IsNullOrWhiteSpace(pressure))
        {
            query = query.Where(p => p.Pressure.ToLower() == pressure.ToLower());
        }

        if (inStockOnly)
        {
            query = query.Where(p => p.StockQuantity > 0);
        }

        return await query
            .OrderBy(p => p.Category.Name)
            .ThenBy(p => p.Name)
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Reference = p.Reference,
                Name = p.Name,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                Size = p.Size,
                Material = p.Material,
                Pressure = p.Pressure,
                Temperature = p.Temperature,
                Description = p.Description,
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

    public async Task<ProductDto?> GetProductByIdAsync(string id)
    {
        return await _context.Products
            .Include(p => p.Category)
            .Where(p => p.Id == id)
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Reference = p.Reference,
                Name = p.Name,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                Size = p.Size,
                Material = p.Material,
                Pressure = p.Pressure,
                Temperature = p.Temperature,
                Description = p.Description,
                Zone = p.Zone,
                Shelf = p.Shelf,
                Bin = p.Bin,
                StockQuantity = p.StockQuantity,
                MaxStock = p.MaxStock,
                StockPercentage = Math.Round((decimal)p.StockQuantity / p.MaxStock * 100, 2),
                IsLowInventory = p.StockQuantity < p.MaxStock * 0.10m
            })
            .FirstOrDefaultAsync();
    }
}