using api;
using api.Services;
using dataAccess;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

// NSwag OpenAPI document generator
builder.Services.AddOpenApiDocument(config =>
{
    config.Title = "Belman API";
    config.Version = "v1";
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "Connection string is missing. Please add DefaultConnection in appsettings.Development.json."
    );
}

builder.Services.AddDbContext<BelmanDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactClient", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IWarehouseService, WarehouseService>();
builder.Services.AddScoped<IAlertService, AlertService>();
builder.Services.AddScoped<IDispatchService, DispatchService>();
builder.Services.AddScoped<IStatsService, StatsService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi();

    await app.GenerateApiClientsFromOpenApi("./../../client/src/api/generatedClient.ts");
}

app.UseCors("ReactClient");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();