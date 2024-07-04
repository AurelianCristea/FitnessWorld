using ApiLicenta.DataLayer.Enums;

namespace ApiLicenta.DataLayer.Models
{
    public class Product : BaseEntity
    {
        public string ProductName { get; set; }
        public float Price { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public Flavor Flavor { get; set; }
    }
}

