using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Subjects : BaseEntity
    {
        public string Sub_Name { get; set; }
        [ForeignKey(nameof(Doctors))] 
        public int Dr_ID { get; set; }
        public Doctors Doctors { get; set; }
        [ForeignKey(nameof(Instructors))]  
        public int Ins_ID { get; set; }
        public Instructors Instructors { get; set; }
        [ForeignKey(nameof(FacultyYearSemister))] 
        public int FacYearSem_ID { get; set; }
        public FacultyYearSemister FacultyYearSemister { get; set; }
        public ICollection<Studets_Rooms_Subject> StudentRooms { get; set; }

    }
}
