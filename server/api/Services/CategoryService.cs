using api.Dtos;
using dataAccess;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class CategoryService : ICategoryService
{
    private readonly BelmanDbContext _context;

    public CategoryService(BelmanDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryDto>> GetCategoriesAsync()
    {
        return await _context.Categories
            .Include(c => c.Products)
            .OrderBy(c => c.Name)
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                ProductCount = c.Products.Count
            })
            .ToListAsync();
    }
}