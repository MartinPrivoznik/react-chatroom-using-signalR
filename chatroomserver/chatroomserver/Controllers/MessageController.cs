using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using chatroomserver.Core;
using chatroomserver.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace chatroomserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "isChatUser")]
    public class MessageController : Controller
    {
        private readonly IMessagesController _messagesController;

        public MessageController(IMessagesController messagesController)
        {
            _messagesController = messagesController;
        }

        // GET: api/Message/targetid
        [HttpGet("{targetUserId}")]
        public async Task<ActionResult<object>> GetMessagesForUser(string targetUserId)
        {
            try
            {
                var id = HttpContext.User.Claims
                    .Where(claim => claim.Type == ClaimTypes.NameIdentifier)
                    .FirstOrDefault()
                    .Value;

                var response = (await _messagesController.GetMessages()).Where(mess => (mess.UserId == id && mess.TargetUserId == targetUserId) || (mess.TargetUserId == id && mess.UserId == targetUserId));
                return Ok(
                    response
                    .Select(res => 
                        new { res.Text,
                              res.Time,
                              isTargeted = res.TargetUserId == id ? true : false
                        })
                    );
            }
            catch (Exception e)
            {
                return Conflict(new { error = e.Message });
            }
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<object>> PostMessage(Messages user)
        {
            try
            {
                return Ok();
            }
            catch (Exception e)
            {
                return Conflict(new { error = e.Message });
            }

            //return Ok( (await _usersController.GetUsers()).ToArray());
        }
    }
}