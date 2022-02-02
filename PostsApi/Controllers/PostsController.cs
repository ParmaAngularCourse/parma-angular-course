using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PostsApi.Models;
using PostsApi.Service;

namespace PostsApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PostsController : ControllerBase
    {
        private PostService _postService;
        public PostsController(PostService postService) {
            _postService=postService;
        }

        [HttpPost]
        public Post[] GetPosts()
        {
            return _postService.GetPosts();
        }

        [HttpPost]
        [Authorize]
        public int AddPost(Post post)
        {
            return _postService.AddPost(post);
        }

        [HttpPost]
        [Authorize]
        public void UpdatePost(Post post)
        {
            _postService.UpdatePost(post);
        }

        [HttpPost]
        [Authorize]
        public void DeletePosts(int[] ids)
        {
            _postService.DeletePosts(ids);
        }

        [HttpPost]
        public Post[] SearchPost(SearchModel model)
        {
            return _postService.SearchPost(model);
        }
    }
}