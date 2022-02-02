using System.Text.Json.Serialization;

namespace PostsApi.Models
{
    public class UserInfo
    {
        public string Email {get; set;}
        public string Surname {get; set;}
        public string Name {get; set;}
        public string Login {get; set;}
        public string Password {get; set;}

        public Permission[] Permissions {get; set;}
    }
}