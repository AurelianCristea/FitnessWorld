using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiLicenta.DataLayer.Models
{
    public class OrderItem : BaseEntity
    {
        public int ProductId { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public string Flavour { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        [ForeignKey("Order")]
        public int OrderId { get; set; }
    }
}
