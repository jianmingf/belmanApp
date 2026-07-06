using api.Dtos;

namespace api.Services;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetCategoriesAsync();
}