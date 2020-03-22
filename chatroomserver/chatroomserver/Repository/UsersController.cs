using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using chatroomserver.Models;
using chatroomserver.Core;

namespace chatroomserver.Repository
{
    public class UsersController : IUsersController
    {
        private readonly pslib_chatroomContext _context;

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

        public Task PostUsers(Users users)
        {
            return Task.Run(() =>
            {
                _context.Users.Add(users);
                try
                {
                    _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    if (UsersExists(users.Id))
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
