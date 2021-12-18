using AngularAppDataServer.Models;
using AngularAppDataServer.Repositories;
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

        internal async Task<IEnumerable<News>> GetNewsData()
        {
            return await dataRepository.LoadNewsData().ConfigureAwait(false);
        }
    }
}
