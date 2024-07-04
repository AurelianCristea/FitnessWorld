using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiLicenta.DataLayer.Repository
{
    public class ProductRepository : BaseRepository<Product>
    {
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
        public async Task<Product?> GetProductByNameAsync(string name)
        {
            if (_dbSet is null)
            {
                return null;
            }
            return await _dbSet.AsQueryable().FirstOrDefaultAsync(us => us.ProductName == name);

        }
        public async void DeleteProductByNameAsync(string name)
        {
            var product = await GetProductByNameAsync(name);
            if (product is null) return;
            _dbSet.Remove(product);
            await _appContext.SaveChangesAsync();
        }
        public async Task<Product?> UpdateProductByNameAsync(string productName, Product product)
        {
            var productToUpdate = await GetProductByNameAsync(productName);
            if (productToUpdate is null) return null;
            productToUpdate.ProductName = product.ProductName;
            productToUpdate.Price = product.Price;
            productToUpdate.Description = product.Description;
            productToUpdate.Category = product.Category;
            productToUpdate.ImagePath = product.ImagePath;
            _dbSet.Update(productToUpdate);
            await _appContext.SaveChangesAsync();
            return productToUpdate;
        }
    }
}
