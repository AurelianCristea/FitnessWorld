using ApiLicenta.DataLayer.Models;
using ApiLicenta.DataLayer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiLicenta.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExercisesController : Controller
    {
        private readonly ExerciseService _exerciseService;

        public ExercisesController(ExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpGet("getExercises", Name = "GetExercises")]
        public async Task<IActionResult> GetExercises()
        {
            var exercises = await _exerciseService.GetAllExercisesAsync();
            return Ok(exercises);
        }

        [HttpPost("addExercise", Name = "AddExercise")]
        public async Task<IActionResult> AddExercise(Exercise exercise)
        {
            await _exerciseService.AddExerciseAsync(exercise);
            return Ok();
        }

        [HttpPut("updateExercise", Name = "UpdateExercise")]
        public async Task<IActionResult> UpdateExercise(string name, Exercise exercise)
        {
            await _exerciseService.UpdateExerciseAsync(exercise);
            return Ok();
        }

        [HttpDelete("deleteExercise", Name = "DeleteExercise")]
        public async Task<IActionResult> DeleteExercise(int id)
        {
            await _exerciseService.DeleteExerciseAsync(id);
            return Ok();
        }
    }
}
