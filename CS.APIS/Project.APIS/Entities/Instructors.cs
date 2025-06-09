using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Instructors : BaseEntity
    {  
        public string Ins_Code { get; set; }
        public string Ins_NameAr { get; set; }
        public string Ins_NameEn { get; set; }
        public string Phone { get; set; }  
    }
}
