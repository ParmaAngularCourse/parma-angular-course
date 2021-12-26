using AngularAppDataServer.Models;
using AngularAppDataServer.Service;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularAppDataServer.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class NewsDataController : ControllerBase
    {
        private readonly NewsDataService dataService;
        private readonly ExecuteService executeService;

        public NewsDataController(NewsDataService dataService, ExecuteService executeService)
        {
            this.dataService = dataService;
            this.executeService = executeService;
        }

        [HttpGet]
        public async Task<ServiceResponse<IEnumerable<News>>> GetNews()
        {
            return await executeService.TryExecute(() => dataService.GetNewsData());
        }

        [HttpPost]
        public async Task<ServiceResponse<News>> AddNews(News news)
        {
            return await executeService.TryExecute(() => dataService.AddNews(news));
        }

        [HttpDelete]
        public async Task<ServiceResponse<object>> DeleteNews(int newsId)
        {
            return await executeService.TryExecute(() => dataService.DeleteNews(newsId));
        }
    }
}
