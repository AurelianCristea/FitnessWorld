using ApiLicenta.DataLayer.Repositories;
using ApiLicenta.DataLayer.Repository;

namespace ApiLicenta.DataLayer.DatabaseConnection
{
    public class UnitOfWork
    {
        private readonly AppDbContext _context;

        public UnitOfWork(AppDbContext context, UserRepository userRepository, ProductRepository productRepository, OrderRepository orderRepository, ExerciseRepository exerciseRepository, WorkoutRepository workoutRepository)
        {
            _context = context;
            this.userRepository = userRepository;
            this.productRepository = productRepository;
            this.orderRepository = orderRepository;
            this.exerciseRepository = exerciseRepository;
            this.workoutRepository = workoutRepository;
        }

        public UserRepository userRepository { get; set; }
        public ProductRepository productRepository { get; set; }
        public OrderRepository orderRepository { get; set; }
        public ExerciseRepository exerciseRepository { get; set; }
        public WorkoutRepository workoutRepository { get; set; }


        public async Task SaveChangesAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var errorMessage = "Error when saving to the database: "
                                   + $"{ex.Message}\n\n"
                                   + $"{ex.InnerException}\n\n"
                                   + $"{ex.StackTrace}\n\n";

                Console.WriteLine(errorMessage);
            }
        }
    }
}
