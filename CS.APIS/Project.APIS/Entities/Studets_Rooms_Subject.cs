using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Studets_Rooms_Subject : BaseEntity
    {
        [ForeignKey(nameof(Students))] 
        public int St_ID { get; set; }
        public Students Students { get; set; }
        [ForeignKey(nameof(Subjects))]
        public int Sub_ID { get; set; }
        public Subjects Subjects { get; set; }

        [ForeignKey(nameof(Rooms))] 
        public int Room_ID { get; set; } 
        public Rooms Rooms { get; set; }

    }
}
