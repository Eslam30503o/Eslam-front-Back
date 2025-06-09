using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Doctors : BaseEntity
    { 
        public string Dr_Code { get; set; }
        public string Dr_NameAr { get; set; }
        public string Dr_NameEn { get; set; }
        public string Dr_Email { get; set; }
        public string? Dr_Image { get; set; }
        public string Phone { get; set; }  


    }
}
