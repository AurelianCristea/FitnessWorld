using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.Models;

namespace ApiLicenta.DataLayer.Services
{
    public class ProductService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly AppDbContext _appContext;
        public ProductService(AppDbContext appContext, UnitOfWork unitOfWork)
        {
            _appContext = appContext;
            _unitOfWork = unitOfWork;
        }
        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _unitOfWork.productRepository.GetByIdAsync(id);
        }
        public async Task<Product?> GetProductByNameAsync(string name) { return await _unitOfWork.productRepository.GetProductByNameAsync(name); }
        public async Task<List<Product>> GetAllProductsAsync() { return await _unitOfWork.productRepository.GetAllAsync(); }
        public async Task AddProductAsync(Product product)
        {
            await _unitOfWork.productRepository.AddAsync(product);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task UpdateProductAsync(Product product)
        {
            await _unitOfWork.productRepository.UpdateAsync(product);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(int id)
        {
            await _unitOfWork.productRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }

    }
}
