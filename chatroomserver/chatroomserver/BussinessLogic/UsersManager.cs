using chatroomserver.BussinessLogic.Model;
using chatroomserver.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatroomserver.BussinessLogic
{
    public class UsersManager : IUsersManager
    {
        private List<OnlineUser> _onlineUsers;

        /// <summary>
        /// Servant class for operating with online users
        /// </summary>
        public UsersManager()
        {
            _onlineUsers = new List<OnlineUser>();
        }

        /// <summary>
        /// Adds online user to list
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="connectionId"></param>
        public Task AddOnlineUser(string userId, string connectionId)
        {
            return Task.Run(() =>
            {
                _onlineUsers.Add(new OnlineUser { Id = userId, ConnectionId = connectionId, TimeJoined = DateTime.Now });
            });
        }

        /// <summary>
        /// Removes online user from List
        /// </summary>
        /// <param name="connectionId"></param>
        public Task RemoveOnlineUser(string connectionId)
        {
            return Task.Run(() =>
            {
                var user = _onlineUsers.Where(usr => connectionId == usr.ConnectionId).FirstOrDefault();
                _onlineUsers.Remove(user);
            });
        }

        /// <summary>
        /// Returns SignalR connection ID dependent on user ID. Returns null if user is offline
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public Task<string> GetConnectionId(string userId)
        {
            return Task.Run(() =>
            {
                return _onlineUsers
                .Where(usr => userId == usr.Id)
                .Select(usr => usr.ConnectionId)
                .FirstOrDefault();
            });
        }

        /// <summary>
        /// Gets user id dependent on connection id
        /// </summary>
        /// <param name="connectionId"></param>
        /// <returns></returns>
        public Task<string> GetUserId(string connectionId)
        {
            return Task.Run(() =>
            {
                return _onlineUsers
                .Where(usr => connectionId == usr.ConnectionId)
                .Select(usr => usr.Id)
                .FirstOrDefault();
            });
        }
    }
}
