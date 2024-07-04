using ApiLicenta.DataLayer.Models;
using ApiLicenta.DataLayer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ApiLicenta.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("createOrder", Name = "CreateOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _orderService.CreateOrderAsync(order);
            return Ok(new { Message = "Order created successfully" });
        }

        [HttpGet("getOrders", Name = "GetOrdersByUser")]
        public async Task<IActionResult> GetOrdersByUser(int userId)
        {
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }
    }
}
