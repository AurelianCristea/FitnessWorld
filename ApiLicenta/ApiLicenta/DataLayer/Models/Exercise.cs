namespace ApiLicenta.DataLayer.Models
{
    public class Exercise: BaseEntity
    {
        public string ExerciseName { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }

        public string VideoPath { get; set; }
    }
}
