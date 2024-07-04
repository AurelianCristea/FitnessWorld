using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.Models;
using ApiLicenta.DataLayer.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiLicenta.DataLayer.Repositories
{
    public class WorkoutRepository : BaseRepository<Workout>
    {
        public WorkoutRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<List<Workout>> GetWorkoutsByUserIdAsync(int userId)
        {
            return await _dbSet.Include(w => w.Items)
                               .Where(w => w.UserId == userId)
                               .ToListAsync();
        }
    }
}
