using chatroomserver.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace chatroomserver.Core
{
    public interface IMessagesController
    {
        Task<Messages> DeleteMessages(int id);
        Task<IEnumerable<Messages>> GetMessages();
        Task<Messages> GetMessages(int id);
        Task PostMessages(Messages messages);
        Task<IActionResult> PutMessages(int id, Messages messages);
    }
}