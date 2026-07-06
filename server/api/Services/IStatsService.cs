using api.Dtos;

namespace api.Services;

public interface IStatsService
{
    Task<DashboardStatsDto> GetStatsAsync();
}