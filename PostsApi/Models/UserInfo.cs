using System.Text.Json.Serialization;

namespace PostsApi.Models
{
    public class UserInfo
    {
        public string Name {get; set;}

        public Permission[] Permissions {get; set;}
    }
}