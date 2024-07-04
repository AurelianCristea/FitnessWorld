using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiLicenta.DataLayer.Services
{
    public class ExerciseService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly AppDbContext _appContext;

        public ExerciseService(AppDbContext appContext, UnitOfWork unitOfWork)
        {
            _appContext = appContext;
            _unitOfWork = unitOfWork;
        }

        public async Task<Exercise?> GetExerciseByIdAsync(int id)
        {
            return await _unitOfWork.exerciseRepository.GetByIdAsync(id);
        }

        public async Task<Exercise?> GetExerciseByNameAsync(string name)
        {
            return await _unitOfWork.exerciseRepository.GetExerciseByNameAsync(name);
        }

        public async Task<List<Exercise>> GetAllExercisesAsync()
        {
            return await _unitOfWork.exerciseRepository.GetAllAsync();
        }

        public async Task AddExerciseAsync(Exercise exercise)
        {
            await _unitOfWork.exerciseRepository.AddAsync(exercise);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateExerciseAsync(Exercise exercise)
        {
            await _unitOfWork.exerciseRepository.UpdateAsync(exercise);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteExerciseAsync(int id)
        {
            await _unitOfWork.exerciseRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
