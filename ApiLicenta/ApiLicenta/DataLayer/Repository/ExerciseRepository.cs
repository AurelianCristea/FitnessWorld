using ApiLicenta.DataLayer.DatabaseConnection;
using ApiLicenta.DataLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ApiLicenta.DataLayer.Repository
{
    public class ExerciseRepository : BaseRepository<Exercise>
    {
        public ExerciseRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<Exercise?> GetExerciseByNameAsync(string name)
        {
            if (_dbSet is null)
            {
                return null;
            }
            return await _dbSet.AsQueryable().FirstOrDefaultAsync(ex => ex.ExerciseName == name);
        }

        public async void DeleteExerciseByNameAsync(string name)
        {
            var exercise = await GetExerciseByNameAsync(name);
            if (exercise is null) return;
            _dbSet.Remove(exercise);
            await _appContext.SaveChangesAsync();
        }

        public async Task<Exercise?> UpdateExerciseByNameAsync(string exerciseName, Exercise exercise)
        {
            var exerciseToUpdate = await GetExerciseByNameAsync(exerciseName);
            if (exerciseToUpdate is null) return null;
            exerciseToUpdate.ExerciseName = exercise.ExerciseName;
            exerciseToUpdate.Category = exercise.Category;
            exerciseToUpdate.Description = exercise.Description;
            exerciseToUpdate.ImagePath = exercise.ImagePath;
            exerciseToUpdate.VideoPath = exercise.VideoPath;
            _dbSet.Update(exerciseToUpdate);
            await _appContext.SaveChangesAsync();
            return exerciseToUpdate;
        }
    }
}
