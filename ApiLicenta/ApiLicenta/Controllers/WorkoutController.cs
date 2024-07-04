using ApiLicenta.DataLayer.Models;
using ApiLicenta.DataLayer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ApiLicenta.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WorkoutController : ControllerBase
    {
        private readonly WorkoutService _workoutService;

        public WorkoutController(WorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpPost("createWorkout", Name = "CreateWorkout")]
        public async Task<IActionResult> CreateWorkout([FromBody] Workout workout)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _workoutService.CreateWorkoutAsync(workout);
            return Ok(new { Message = "Workout created successfully" });
        }

        [HttpGet("getWorkouts", Name = "GetWorkoutsByUser")]
        public async Task<IActionResult> GetWorkoutsByUser(int userId)
        {
            var workouts = await _workoutService.GetWorkoutsByUserIdAsync(userId);
            return Ok(workouts);
        }
    }
}
