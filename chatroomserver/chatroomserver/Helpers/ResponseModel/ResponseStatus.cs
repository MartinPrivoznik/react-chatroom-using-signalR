﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatroomserver.Helpers.ResponseModel
{
    public class ResponseStatus
    {
        private ReturnStatus.Status _status;
        private string _message;

        /// <summary>
        /// Internal response status to indicate types of errors
        /// </summary>
        /// <param name="status"></param>
        /// <param name="message"></param>
        public ResponseStatus(ReturnStatus.Status status, string message = "")
        {
            _status = status;
            _message = message;

            switch (_status)
            {
                case ReturnStatus.Status.OK:
                    Key = 0;
                    break;
                case ReturnStatus.Status.UserExists:
                    Key = 1;
                    break;
                case ReturnStatus.Status.DatabaseError:
                    Key = 2;
                    break;
            }
        }

        public ReturnStatus.Status Status { get => _status; }

        /// <summary>
        ///0 == OK
        ///1 == User Exists
        ///2 == Database internal error
        /// </summary>
        public int Key { get; set; }

        public string Message { get => _message; }
    }
}
