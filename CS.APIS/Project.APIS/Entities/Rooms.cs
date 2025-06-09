using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Rooms : BaseEntity
    {  
        public string Room_Num { get; set; }
        public   ICollection<Studets_Rooms_Subject> StudentRooms { get; set; }
    }
}
