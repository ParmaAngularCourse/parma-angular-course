namespace AngularAppDataServer.Models
{
    public class Permission
    {
        public string Key { get; set; } = "";

        public bool Access { get; set; } = false;

        public Permission(string key, bool access)
        {
            Key = key;
            Access = access;
        }
    }
}
