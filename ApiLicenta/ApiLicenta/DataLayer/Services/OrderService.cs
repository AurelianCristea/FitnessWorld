using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiLicenta.DataLayer.Services
{
    public class OrderService
    {
        private readonly UnitOfWork _unitOfWork;

        public OrderService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task CreateOrderAsync(Order order)
        {
            await _unitOfWork.orderRepository.AddAsync(order);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<List<Order>> GetOrdersByUserIdAsync(int userId)
        {
            return await _unitOfWork.orderRepository.GetOrdersByUserIdAsync(userId);
        }
    }
}
