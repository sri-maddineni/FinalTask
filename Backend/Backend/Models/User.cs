using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Backend.Models
{
	public class User
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string id { get; set; }

		public string name {  get; set; }
		public string username { get; set; }
		public string email { get; set; }
		public string password { get; set; }
	}

	public class UserLogin
	{
		public string email { get; set; }
		public string password { get; set; }
	}


}
