using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class FullMessageModel : MessageModel
    {
        public double TimeMs { get; set; }
        public int Id { get; set; } = -1;
    }
}