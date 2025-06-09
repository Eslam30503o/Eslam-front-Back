using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class FacultyYear : BaseEntity
    {
        public string Year { get; set; }
        [ForeignKey(nameof(Faculty))]
        public int Fac_ID { get; set; }
        public Faculty Faculty { get; set; }

    }
}
