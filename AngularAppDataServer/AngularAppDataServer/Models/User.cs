using System.Collections.Generic;

namespace AngularAppDataServer.Models
{
    public class User
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public List<Permission> Permissions { get; set; }
    }
}
