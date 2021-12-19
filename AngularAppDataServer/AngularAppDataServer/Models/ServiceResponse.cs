namespace AngularAppDataServer.Models
{
    public class ServiceResponse<T>
    {
        public bool IsSuccess { get; set; } = true;

        public string ErrorText { get; set; }

        public T Data { get; set; }
    }
}
