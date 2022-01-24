using System.Collections.Generic;

namespace AngularAppDataServer.Models
{
    public class User
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public List<Permission> Permissions { get; set; }
    }
}
