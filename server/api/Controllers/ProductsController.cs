using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetProducts(
        [FromQuery] string? search,
        [FromQuery] string? categoryId,
        [FromQuery] string? category,
        [FromQuery] string? size,
        [FromQuery] string? material,
        [FromQuery] string? pressure,
        [FromQuery] bool inStockOnly = false)
    {
        var products = await _productService.GetProductsAsync(
            search,
            categoryId,
            category,
            size,
            material,
            pressure,
            inStockOnly
        );

        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProductById(string id)
    {
        var product = await _productService.GetProductByIdAsync(id);

        if (product is null)
        {
            return NotFound();
        }

        return Ok(product);
    }
}