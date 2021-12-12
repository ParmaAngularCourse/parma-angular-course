using Microsoft.AspNetCore.Mvc;
using Parma.NewsApplication.Web.Entities;
using Parma.NewsApplication.Web.Repositories;
using System.Net.Mime;

namespace Parma.NewsApplication.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    [Consumes(MediaTypeNames.Application.Json)]
    public class NewsController : ControllerBase
    {
        private readonly NewsRepository _repository;

        public NewsController(NewsRepository repository) => _repository = repository;

        [HttpGet]
        public List<NewsItem> Get()
        {
            return _repository.Get();
        }

        [HttpGet("id")]
        public NewsItem? Get([FromQuery] int id)
        {
            return _repository.Get(id);
        }

        [HttpPost]
        public int Add([FromBody] AddNewsRequest request)
        {
            return _repository.Add(request);
        }

        [HttpPut]
        public void Change([FromBody] NewsItem item)
        {
            _repository.Change(item);
        }

        [HttpDelete]
        public void Delete([FromQuery] int id)
        {
            _repository.Delete(id);
        }
    }
}