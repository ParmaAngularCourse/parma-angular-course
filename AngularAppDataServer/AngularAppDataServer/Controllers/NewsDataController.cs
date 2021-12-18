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

        public NewsDataController(NewsDataService dataService)
        {
            this.dataService = dataService;
        }

        [HttpGet]
        public async Task<IEnumerable<News>> GetNews()
        {
            return await dataService.GetNewsData().ConfigureAwait(false);
        }
    }
}
