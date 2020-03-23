using chatroomserver.Helpers.ResponseModel;
using chatroomserver.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace chatroomserver.Core
{
    public interface IUsersController
    {
        Task<Users> DeleteUsers(string id);
        Task<IEnumerable<Users>> GetUsers();
        Task<Users> GetUsers(string id);
        Task<ResponseStatus> PostUsers(Users users);
        Task PutUsers(string id, Users users);
    }
}