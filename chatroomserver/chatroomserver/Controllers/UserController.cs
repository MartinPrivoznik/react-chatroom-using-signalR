using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using chatroomserver.Core;
using chatroomserver.Helpers.ResponseModel;
using chatroomserver.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace chatroomserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "isChatUser")]
    public class UserController : ControllerBase
    {
        private readonly IUsersController _usersController;

        public UserController(IUsersController usersController)
        {
            _usersController = usersController;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<object>> GetUsers()
        {
            try
            {
                return Ok((await _usersController.GetUsers()).Where(usr => usr.Id != (HttpContext.User.Claims
                    .Where(claim => claim.Type == ClaimTypes.NameIdentifier))
                    .FirstOrDefault()
                    .Value)
                    .Select(usr => new {
                        usr.Id,
                        usr.GivenName,
                        usr.MiddleName,
                        usr.LastName,
                        usr.PreferredUsername,
                        lastMessage = getLastMessage(usr)
                    }));
            }
            catch (Exception e)
            {
                return Conflict(new { error = e.Message });
            }
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<object>> PostUser(Users user)
        {
            try
            {
                var response = await _usersController.PostUsers(user);

                if (response.Status == ReturnStatus.Status.DatabaseError)
                {
                    return new { error = response.Message };
                }
            }
            catch (Exception e)
            {
                return Conflict(new { error = e.Message });
            }

            return Ok();
            //return Ok( (await _usersController.GetUsers()).ToArray());
        }

        private string getLastMessage(Users user)
        {
            var lastOwnMessage = user.MessagesUser.OrderByDescending(mess => mess.Time).FirstOrDefault();
            var lastTargetedMessage = user.MessagesTargetUser.OrderByDescending(mess => mess.Time).FirstOrDefault(); ;

            if(lastOwnMessage == null && lastTargetedMessage == null)
            {
                return "";
            }
            else if(lastOwnMessage != null && lastTargetedMessage == null)
            {
                return lastOwnMessage.Text;
            }
            else if(lastOwnMessage == null && lastTargetedMessage != null)
            {
                return lastTargetedMessage.Text;
            }
            else
            {
                switch(Nullable.Compare<DateTime>(lastOwnMessage.Time, lastTargetedMessage.Time))
                {
                    case -1:
                        return lastTargetedMessage.Text;
                    case 0:
                        return lastOwnMessage.Text;
                    case 1:
                        return lastOwnMessage.Text;
                    default:
                        return lastOwnMessage.Text;
                }
            }
        }
    }
}
