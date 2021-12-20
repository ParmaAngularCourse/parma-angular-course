using Parma.NewsApplication.Web.Entities;

namespace Parma.NewsApplication.Web.Repositories
{
    public sealed class NewsRepository
    {
        private readonly static List<NewsItem> Items = new()
        {
            new NewsItem(0, "Погода", "В ближайшие дни ожидается мокрый дождь со снегом", new DateTime(2020, 1, 20, 10, 52, 30), NewsType.Internet),
            new NewsItem(1, "Работа", "Корпоративу на НГ - быть!", new DateTime(2021, 2, 12, 8, 19, 56), NewsType.Tourism),
            new NewsItem(2, ".NET", "Вышел новый подкаст на тему '.net 6'", new DateTime(2022, 3, 16, 20, 11, 9), NewsType.Science)
        };

        private readonly object _locker = new object();

        public List<NewsItem> Get()
        {
            return Items;
        }

        public NewsItem? Get(int id)
        {
            return Items.FirstOrDefault(x => x.Id == id);
        }

        public void Change(NewsItem item)
        {
            var changedItem = Items.FirstOrDefault(x => x.Id == item.Id);
            if (changedItem != null)
            {
                Items[Items.IndexOf(changedItem)] = item;
            }
        }

        public int Add(AddNewsRequest request)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var maxId = Items.Max(x => x.Id);
            NewsItem item = new(maxId + 1, request.Title, request.Text, request.Date, request.Type);
            Items.Add(item);

            return item.Id;
        }

        public void Delete(int id)
        {
            lock (_locker)
            {
                var deletingItem = Items.FirstOrDefault(x => x.Id == id);
                if (deletingItem != null)
                {
                    Items.Remove(deletingItem);
                }
            }
        }
    }
}