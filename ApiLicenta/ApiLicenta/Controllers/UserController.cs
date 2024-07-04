using ApiLicenta.DataLayer.DTO;
using ApiLicenta.DataLayer.Models;
using ApiLicenta.DataLayer.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiLicenta.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        public readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }
        [HttpPost("register", Name = "CreateUser")]
        public async Task<IActionResult> Create(UserDto user)
        {
            await _userService.AddUserAsync(user);
            return Ok(new { message = "User created", name = user.Name });
        }

        [HttpPost("login", Name = "LoginUser")]
        public async Task<IActionResult> Login(UserDto user)
        {
            var userFromDb = await _userService.Login(user);
            if (userFromDb is null)
            {
                return NotFound("User not found");
            }
            if (userFromDb.Password != user.Password)
            {
                return Unauthorized("Incorrect password");
            }
            return Ok(new { name = userFromDb.Name });
        }
        [HttpGet("getUsers", Name = "GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("getUserIdByName", Name = "GetUserIdByName")]
        public async Task<IActionResult> GetUserIdByName(string name)
        {
            var userId = await _userService.GetUserIdByNameAsync(name);
            if (userId == null)
            {
                return NotFound("User not found");
            }
            return Ok(new { Id = userId });
        }

    }
}
