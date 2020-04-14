using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatroomserver.BussinessLogic.Model
{
    public class OnlineUser
    {
        public string ConnectionId { get; set; }
        public string Id { get; set; }
        public DateTime TimeJoined { get; set; }
    }
}
