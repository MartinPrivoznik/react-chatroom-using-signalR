using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatroomserver.Helpers.ResponseModel
{
    public static class ReturnStatus
    {
        public enum Status { OK, UserExists, DatabaseError }
    }
}
