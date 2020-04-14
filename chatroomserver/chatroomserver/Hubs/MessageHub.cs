using chatroomserver.Core;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatroomserver.Hubs
{
    public class MessageHub : Hub
    {
        private readonly IUsersManager _usersManager;

        /// <summary>
        /// Chat hub providing information about online users and passing messages
        /// </summary>
        /// <param name="usersManager"></param>
        public MessageHub(IUsersManager usersManager)
        {
            _usersManager = usersManager;
        }

        /// <summary>
        /// Adds user to online users list
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public Task<bool> JoinChat(string userId)
        {
            return Task.Run(() =>
            {
                try
                {
                    _usersManager.AddOnlineUser(userId, Context.ConnectionId);
                    return true;
                }
                catch
                {
                    return false;
                }
            });
             
        }

        /// <summary>
        /// Removes user from online users list
        /// </summary>
        /// <returns></returns>
        public Task LeaveChat()
        {
            return _usersManager.RemoveOnlineUser(Context.ConnectionId);
        }

        /// <summary>
        /// Sends a message to a specified user
        /// </summary>
        /// <param name="targetUserId"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public async Task PostMessage(string targetUserId, string message)
        {
            var connId = await _usersManager.GetConnectionId(targetUserId);
            if (connId != null)
            {
                await Clients
                    .Client(connId)
                    .SendAsync("PostMessage", 
                               _usersManager.GetUserId(Context.ConnectionId), 
                               message);
            }
        }

    }
}