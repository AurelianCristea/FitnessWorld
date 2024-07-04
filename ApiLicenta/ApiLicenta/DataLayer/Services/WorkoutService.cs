using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiLicenta.DataLayer.Services
{
    public class WorkoutService
    {
        private readonly UnitOfWork _unitOfWork;

        public WorkoutService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task CreateWorkoutAsync(Workout workout)
        {
            await _unitOfWork.workoutRepository.AddAsync(workout);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<List<Workout>> GetWorkoutsByUserIdAsync(int userId)
        {
            return await _unitOfWork.workoutRepository.GetWorkoutsByUserIdAsync(userId);
        }
    }
}
