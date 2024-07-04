using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.DTO;
using ApiLicenta.DataLayer.Models;

namespace ApiLicenta.DataLayer.Services
{
    public class UserService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly AppDbContext _appContext;
        public UserService(AppDbContext appContext, UnitOfWork unitOfWork)
        {
            _appContext = appContext;
            _unitOfWork = unitOfWork;
        }
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _unitOfWork.userRepository.GetByIdAsync(id);
        }
        public async Task<User?> GetUserByNameAsync(string name)
        {
            return await _unitOfWork.userRepository.GetUserByNameAsync(name);
        }

        public async Task<int?> GetUserIdByNameAsync(string name)
        {
            var user = await _unitOfWork.userRepository.GetUserByNameAsync(name);
            return user?.Id;
        }
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _unitOfWork.userRepository.GetAllAsync();
        }
        public async Task AddUserAsync(UserDto user)
        {
            var newUser = new User
            {
                Name = user.Name,
                Password = user.Password
            };
            await _unitOfWork.userRepository.AddAsync(newUser);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task UpdateUserAsync(User user)
        {
            _unitOfWork.userRepository.UpdateAsync(user);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task DeleteUserAsync(int id)
        {
            _unitOfWork.userRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task<User?> Login(UserDto user)
        {
            return await _unitOfWork.userRepository.Login(user);
        }
    }
}
