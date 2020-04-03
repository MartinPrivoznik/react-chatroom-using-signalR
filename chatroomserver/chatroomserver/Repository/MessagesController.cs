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
    public class MessagesController : IMessagesController
    {
        private readonly pslib_chatroomContext _context;

        /// <summary>
        /// Messages class implementing CRUD
        /// </summary>
        /// <param name="context"></param>
        public MessagesController(pslib_chatroomContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Messages>> GetMessages()
        {
            return await _context.Messages.ToListAsync();
        }

        public async Task<Messages> GetMessages(int id)
        {
            var messages = await _context.Messages.FindAsync(id);

            if (messages == null)
            {
                return null;
            }

            return messages;
        }

        public async Task<IActionResult> PutMessages(int id, Messages messages)
        {
            if (id != messages.Id)
            {
                return null;
            }

            _context.Entry(messages).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessagesExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return null;
        }

        public async Task PostMessages(Messages messages)
        {
            _context.Messages.Add(messages);
            await _context.SaveChangesAsync();
        }

        public async Task<Messages> DeleteMessages(int id)
        {
            var messages = await _context.Messages.FindAsync(id);
            if (messages == null)
            {
                return null;
            }

            _context.Messages.Remove(messages);
            await _context.SaveChangesAsync();

            return messages;
        }

        private bool MessagesExists(int id)
        {
            return _context.Messages.Any(e => e.Id == id);
        }
    }
}
