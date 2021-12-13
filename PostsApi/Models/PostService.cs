using System;
using System.Collections.Generic;
using System.Linq;

namespace PostsApi.Models
{
    public class PostService
    {
        private List<Post> _posts;
        public PostService()
        {
            var rnd = new Random();
            var postTypes = Enum.GetValues<PostTypeEnum>();
            _posts = Enumerable.Range(0,7).Select(index => new Post() {
                Id = index,
                Date = DateTime.Now.AddDays(rnd.Next(100)),
                Title = "Title " + (++index),
                Text = "Test text " + rnd.Next(),
                PostType = postTypes[rnd.Next(postTypes.Length)],
            }).ToList();
        }

        public Post[] GetPosts()
        {
            return _posts.ToArray();
        }

        public void AddPost(Post post)
        {
            _posts.Add(post);
        }

        public void DeletePosts(int[] ids)
        {
            var deletePosts = _posts.Where(e => ids.Contains(e.Id)).ToList();
            foreach(var deletePost in deletePosts)
            {
                _posts.Remove(deletePost);
            }
        }
    }
}