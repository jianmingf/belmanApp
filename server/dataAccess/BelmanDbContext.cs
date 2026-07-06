using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using dataAccess.Entities;

namespace dataAccess;

public partial class BelmanDbContext : DbContext
{
    public BelmanDbContext(DbContextOptions<BelmanDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<DispatchRequest> DispatchRequests { get; set; }

    public virtual DbSet<InventoryAlert> InventoryAlerts { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("category_pkey");

            entity.ToTable("category", "belman");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<DispatchRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("dispatch_request_pkey");

            entity.ToTable("dispatch_request", "belman");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CompletedAt).HasColumnName("completed_at");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.RequestedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("requested_at");
            entity.Property(e => e.RequestedBy).HasColumnName("requested_by");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Workshop).HasColumnName("workshop");

            entity.HasOne(d => d.Product).WithMany(p => p.DispatchRequests)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("dispatch_request_product_id_fkey");
        });

        modelBuilder.Entity<InventoryAlert>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("inventory_alert_pkey");

            entity.ToTable("inventory_alert", "belman");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AlertType).HasColumnName("alert_type");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.IsResolved).HasColumnName("is_resolved");
            entity.Property(e => e.MaxStock).HasColumnName("max_stock");
            entity.Property(e => e.Message).HasColumnName("message");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.ResolvedAt).HasColumnName("resolved_at");
            entity.Property(e => e.Severity).HasColumnName("severity");
            entity.Property(e => e.StockPercentage).HasColumnName("stock_percentage");
            entity.Property(e => e.StockQuantity).HasColumnName("stock_quantity");

            entity.HasOne(d => d.Product).WithMany(p => p.InventoryAlerts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("inventory_alert_product_id_fkey");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("product_pkey");

            entity.ToTable("product", "belman");

            entity.HasIndex(e => e.Reference, "product_reference_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Bin).HasColumnName("bin");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Material).HasColumnName("material");
            entity.Property(e => e.MaxStock).HasColumnName("max_stock");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Pressure).HasColumnName("pressure");
            entity.Property(e => e.Reference).HasColumnName("reference");
            entity.Property(e => e.Shelf).HasColumnName("shelf");
            entity.Property(e => e.Size).HasColumnName("size");
            entity.Property(e => e.StockQuantity).HasColumnName("stock_quantity");
            entity.Property(e => e.Temperature).HasColumnName("temperature");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("updated_at");
            entity.Property(e => e.Zone).HasColumnName("zone");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("product_category_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
