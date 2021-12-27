using System;

namespace AngularAppDataServer.Models
{
    public class News
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public NewsType Type { get; set; } = NewsType.Type0_None;

        public News(int Id, DateTime Date, string Title, string Body, NewsType Type = NewsType.Type0_None)
        {
            this.Id = Id;
            this.Date = Date;
            this.Title = Title;
            this.Body = Body;
            this.Type = Type;
        }
    }
}
