using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using PostsApi.Models;

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
        public void AddPost(Post post)
        {
            _postService.AddPost(post);
        }

        [HttpPost]
        public void DeletePosts(int[] ids)
        {
            _postService.DeletePosts(ids);
        }
    }
}