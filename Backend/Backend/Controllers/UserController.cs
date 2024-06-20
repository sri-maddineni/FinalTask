using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly UserService _userService;
		private readonly IConfiguration _configuration;

		public UserController(IConfiguration configuration, UserService userService)
		{
			_userService = userService;
			_configuration = configuration;
			
		}

		[HttpGet]
		public async Task<ActionResult<List<User>>> GetUsers()
		{
			var users = await _userService.GetUsersAsync();
			return Ok(users);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<User>> GetUserById(string id)
		{
			var user = await _userService.GetUserByIdAsync(id);
			if (user == null)
			{
				return NotFound();
			}
			return Ok(user);
		}

		[HttpPost]
		public async Task<ActionResult<User>> CreateUser(User user)
		{
			await _userService.CreateUserAsync(user);
			return CreatedAtAction(nameof(GetUserById), new { id = user.id }, user);
		}


		

		[HttpPost("login")]
		public async Task<IActionResult> Login(UserLogin userLoginDto)
		{
			var user = await _userService.GetUserByEmailAsync(userLoginDto.email);

			if (user == null || user.password != userLoginDto.password)
			{
				return Unauthorized();
			}

			var jwtSettings = _configuration.GetSection("JwtSettings").Get<JwtSettings>();
			var key = Encoding.ASCII.GetBytes(jwtSettings.SecretKey);
			var tokenHandler = new JwtSecurityTokenHandler();

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				{
					new Claim(ClaimTypes.Name, user.id)
				}),
				Expires = DateTime.UtcNow.AddDays(jwtSettings.ExpirationInDays),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			var tokenString = tokenHandler.WriteToken(token);

			return Ok(new { Token = tokenString });
		}
	}
}
