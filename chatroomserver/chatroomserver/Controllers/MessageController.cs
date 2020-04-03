﻿using System;
using System.Collections.Generic;
using System.Linq;
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

        // GET: api/Message
        [HttpGet]
        public async Task<ActionResult<object>> GetMessages()
        {
            try
            {
                var response = await _messagesController.GetMessages();
                return Ok();
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