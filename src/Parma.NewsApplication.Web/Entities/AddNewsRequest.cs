namespace Parma.NewsApplication.Web.Entities
{
    public sealed class AddNewsRequest
    {
        public string Title { get; set; } = string.Empty;

        public string Text { get; set;} = string.Empty;

        public DateTime Date { get; set; }

        public NewsType Type { get; set; }
    }
}