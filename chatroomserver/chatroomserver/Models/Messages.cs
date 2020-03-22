using System;
using System.Collections.Generic;

namespace chatroomserver.Models
{
    public partial class Messages
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string TargetUserId { get; set; }
        public string Text { get; set; }
        public DateTime? Time { get; set; }

        public virtual Users TargetUser { get; set; }
        public virtual Users User { get; set; }
    }
}
