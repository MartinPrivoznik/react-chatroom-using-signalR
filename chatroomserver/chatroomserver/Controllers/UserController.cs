﻿using System;
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

                var response = await _usersController.GetUsers();
                return Ok(response.Where(usr => usr.Id != (HttpContext.User.Claims
                    .Where(claim => claim.Type == ClaimTypes.NameIdentifier))
                    .FirstOrDefault()
                    .Value));
            }
            catch (Exception e)
            {
                return Conflict(new { error = e.Message });
            }
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
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

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
