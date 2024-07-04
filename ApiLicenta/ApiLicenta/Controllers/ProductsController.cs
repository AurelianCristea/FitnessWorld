using ApiLicenta.DataLayer.Models;
using ApiLicenta.DataLayer.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiLicenta.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : Controller
    {
        private readonly ProductService _productService;
        public ProductsController(ProductService productService)
        {
            _productService = productService;
        }
        [HttpGet("getProducts", Name = "GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }
        [HttpPost("addProduct", Name = "AddProduct")]
        public async Task<IActionResult> AddProduct(Product product)
        {
            await _productService.AddProductAsync(product);
            return Ok();
        }
        [HttpPut("updateProduct", Name = "UpdateProduct")]
        public async Task<IActionResult> UpdateProduct(string name, Product product)
        {
            await _productService.UpdateProductAsync(product);
            return Ok();
        }
        [HttpDelete("deleteProduct", Name = "DeleteProduct")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _productService.DeleteProductAsync(id);
            return Ok();
        }

    }
}
