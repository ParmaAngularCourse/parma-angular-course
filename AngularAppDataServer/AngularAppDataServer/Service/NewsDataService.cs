using AngularAppDataServer.Models;
using AngularAppDataServer.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularAppDataServer.Service
{
    public class NewsDataService
    {
        private readonly NewsDataRepository dataRepository;

        public NewsDataService(NewsDataRepository dataRepository)
        {
            this.dataRepository = dataRepository;
        }

        internal async Task<IEnumerable<News>> GetNewsData(Filter filter)
        {
            return await dataRepository.LoadNewsData(filter).ConfigureAwait(false);
        }

        internal async Task<News> AddNews(News news)
        {
            return await dataRepository.AddNews(news).ConfigureAwait(false);
        }

        internal async Task DeleteNews(int newsId)
        {
            await dataRepository.DeleteNews(newsId).ConfigureAwait(false);
        }
    }
}
