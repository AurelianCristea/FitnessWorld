using System.ComponentModel.DataAnnotations;

namespace ApiLicenta.DataLayer.Models
{
    public class Order:BaseEntity
    {
        public int UserId { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Phone { get; set; }
        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}
