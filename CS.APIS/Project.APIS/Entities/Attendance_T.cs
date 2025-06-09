using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Attendance_T : BaseEntity
    {
        [ForeignKey(nameof(Lecture))]
        public int LectureID { get; set; } 
        public Lecture_S Lecture { get; set; }
        public int St_ID { get; set; } 
        public bool Atten { get; set; }
    }
}
