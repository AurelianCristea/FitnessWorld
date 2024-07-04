using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.DTO;
using ApiLicenta.DataLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiLicenta.DataLayer.Repository
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
        public async Task<User?> GetUserByNameAsync(string name)
        {
            if (_dbSet is null)
            {
                return null;
            }
            return await _dbSet.AsQueryable().FirstOrDefaultAsync(us => us.Name == name);

        }
        public async Task<User?> Login(UserDto user)
        {

            if (_dbSet is null)
            {
                return null;
            }
            return await _dbSet.AsQueryable().FirstOrDefaultAsync(us => us.Name == user.Name && us.Password == user.Password);
        }
    }
}
