using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatroomserver.Core
{
    public interface IUsersManager
    {
        Task AddOnlineUser(string userId, string connectionId);
        Task<string> GetConnectionId(string userId);
        Task<string> GetUserId(string connectionId);
        Task RemoveOnlineUser(string connectionId);
    }
}
