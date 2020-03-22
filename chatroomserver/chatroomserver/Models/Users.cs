using System;
using System.Collections.Generic;

namespace chatroomserver.Models
{
    public partial class Users
    {
        public Users()
        {
            MessagesTargetUser = new HashSet<Messages>();
            MessagesUser = new HashSet<Messages>();
        }

        public string Id { get; set; }
        public string GivenName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string PreferredUsername { get; set; }

        public virtual ICollection<Messages> MessagesTargetUser { get; set; }
        public virtual ICollection<Messages> MessagesUser { get; set; }
    }
}
