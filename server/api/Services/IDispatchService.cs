using api.Dtos;

namespace api.Services;

public interface IDispatchService
{
    Task<List<DispatchDto>> GetDispatchesAsync();
    Task<bool> MarkReadyAsync(string id);
}