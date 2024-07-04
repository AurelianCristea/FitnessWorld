using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiLicenta.DataLayer.Models
{
    public class WorkoutItem:BaseEntity
    {
        public int ExerciseId { get; set; }

        [Required]
        public string ExerciseName { get; set; }

        [ForeignKey("Workout")]
        public int WorkoutId { get; set; }
    }
}
