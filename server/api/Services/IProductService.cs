using api.Dtos;

namespace api.Services;

public interface IProductService
{
    Task<List<ProductDto>> GetProductsAsync(
        string? search,
        string? categoryId,
        string? category,
        string? size,
        string? material,
        string? pressure,
        bool inStockOnly
    );

    Task<ProductDto?> GetProductByIdAsync(string id);
}