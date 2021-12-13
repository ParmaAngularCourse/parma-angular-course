using System;

namespace PostsApi.Models
{
    public class Post
    {
        public int Id {get; set;}

        public DateTime Date {get; set;}

        public string Title {get; set;}

        public string Text {get; set;}

        public PostTypeEnum PostType {get; set;}
    }
}