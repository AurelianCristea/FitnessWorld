namespace ApiLicenta.DataLayer.Models
{
    public class Workout: BaseEntity
    {
        public int UserId { get; set; }

        public string Day { get; set; }

        public int Sets { get; set; }
        public int Reps { get; set; }

        public List<WorkoutItem> Items { get; set; } = new List<WorkoutItem>();

    }
}
