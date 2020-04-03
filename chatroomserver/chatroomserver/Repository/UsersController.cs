using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using chatroomserver.Models;
using chatroomserver.Core;
using chatroomserver.Helpers;
using chatroomserver.Helpers.ResponseModel;

namespace chatroomserver.Repository
{
    public class UsersController : IUsersController
    {
        private readonly pslib_chatroomContext _context;

        /// <summary>
        /// User class implementing CRUD
        /// </summary>
        /// <param name="context"></param>
        public UsersController(pslib_chatroomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Users>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<Users> GetUsers(string id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return null;
            }

            return users;
        }

        public Task PutUsers(string id, Users users)
        {
            return Task.Run(() =>
            {
                if (id != users.Id)
                {
                    return null;
                }

                _context.Entry(users).State = EntityState.Modified;

                try
                {
                    _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UsersExists(id))
                    {
                        return null;
                    }
                    else
                    {
                        throw;
                    }
                }

                return null;
            });
        }

        public async Task<ResponseStatus> PostUsers(Users users)
        {
            if (UsersExists(users.Id))
            {
                //Add to socket channel
                return new ResponseStatus(ReturnStatus.Status.UserExists);
            }
            else
            {
                try
                {
                    _context.Users.Add(users);
                    await _context.SaveChangesAsync();
                    return new ResponseStatus(ReturnStatus.Status.OK);
                }
                catch (DbUpdateException e)
                {
                    return new ResponseStatus(ReturnStatus.Status.DatabaseError, e.Message);
                }
            }
            
        }

        public async Task<Users> DeleteUsers(string id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return null;
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return users;
        }

        private bool UsersExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
