namespace Parma.NewsApplication.Web.Entities
{
    public sealed class NewsItem
    {
        public NewsItem(int id, string title, string text, DateTime date, NewsType type)
        {
            Id = id;
            Title = title;
            Text = text;
            Date = date;
            Type = type;
        }

        public int Id { get; init; }

        public string Title { get; init; }

        public string Text { get; init; }

        public DateTime Date { get; init; }

        public NewsType Type { get; init; }
    }
}