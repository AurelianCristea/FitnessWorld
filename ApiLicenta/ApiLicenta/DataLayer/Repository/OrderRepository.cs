using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.Models;
using ApiLicenta.DataLayer.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiLicenta.DataLayer.Repositories
{
    public class OrderRepository : BaseRepository<Order>
    {
        public OrderRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<List<Order>> GetOrdersByUserIdAsync(int userId)
        {
            return await _dbSet.Include(o => o.Items)
                               .Where(o => o.UserId == userId)
                               .ToListAsync();
        }
    }
}
