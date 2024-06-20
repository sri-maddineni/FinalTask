using Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Backend.Services
{
	public class UserService
	{
		private readonly IMongoCollection<User> _users;

		public UserService(IOptions<MongoDBSettings> mongoDBSettings, IMongoClient mongoClient)
		{
			var database = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);
			_users = database.GetCollection<User>("users");
		}

		public async Task<List<User>> GetUsersAsync() => await _users.Find(user => true).ToListAsync();

		public async Task<User> GetUserByEmailAsync(string email)
		{
			return await _users.Find(u => u.email == email).FirstOrDefaultAsync();
		}
		public async Task<User> GetUserByIdAsync(string id) => await _users.Find(user => user.id == id).FirstOrDefaultAsync();

		public async Task CreateUserAsync(User user) => await _users.InsertOneAsync(user);
	}
}
